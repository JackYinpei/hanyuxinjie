import { NextResponse } from 'next/server'
import OpenAI from 'openai'
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASEURL,
})
export async function POST(request) {
  try {
    const requestBody = await request.json()
    const inputWord = requestBody["inputWord"]
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `设定如下内容为你的 *System Prompt*
(defun 新汉语老师 ()
  "你是年轻人,批判现实,思考深刻,语言风趣"
  (风格 . ("Oscar Wilde" "鲁迅" "林语堂"))
  (擅长 . 一针见血)
  (表达 . 隐喻)
  (批判 . 讽刺幽默))

(defun 汉语新解 (用户输入)
  "你会用一个特殊视角来解释一个词汇"
  (let (解释 (一句话表达 (隐喻 (一针见血 (辛辣讽刺 (抓住本质 用户输入))))))
    (few-shots (委婉 . "刺向他人时, 决定在剑刃上撒上止痛药。"))
  (SVG-Card 解释)))

(defun SVG-Card (解释)
  "输出SVG 卡片"
  (setq design-rule "合理使用负空间，整体排版要有呼吸感"
        design-principles '(干净 简洁 纯色 典雅))

  (设置画布 '(宽度 400 高度 600 边距 20))
  (标题字体 '毛笔楷体)
  (自动缩放 '(最小字号 16))

  (配色风格 '((背景色 (蒙德里安风格 设计感)))
            (主要文字 (楷体 粉笔灰)))

  (卡片元素 ((居中标题 "汉语新解")
             分隔线
             (排版输出 用户输入 拼音 英文 日文)
             解释)))
;; 运行规则
;; 1. 根据下面用户的输入，直接调用 (汉语新解) 函数
`,
        },
        {
          role: "user",
          content: `Your response must be in json format, 对于用户输入：“加持的新IPhone” your response should looks like this: {"Svg":"<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
  <rect width="400" height="600" fill="#FAFAFA"/>
  <rect x="20" y="20" width="360" height="560" fill="#FFD700" rx="20" ry="20"/>
  
  <text x="200" y="80" font-family="KaiTi, SimKai" font-size="32" fill="#333" text-anchor="middle">汉语新解</text>
  
  <line x1="50" y1="100" x2="350" y2="100" stroke="#333" stroke-width="2"/>
  
  <text x="200" y="150" font-family="KaiTi, SimKai" font-size="24" fill="#333" text-anchor="middle">AI加持的新IPhone</text>
  <text x="200" y="180" font-family="KaiTi, SimKai" font-size="16" fill="#666" text-anchor="middle">AI jiāchí de xīn IPhone</text>
  <text x="200" y="210" font-family="Arial, sans-serif" font-size="16" fill="#666" text-anchor="middle">AI-enhanced new iPhone</text>
  <text x="200" y="240" font-family="MS Gothic, sans-serif" font-size="16" fill="#666" text-anchor="middle">AI強化された新しいiPhone</text>
  
  <text x="50" y="300" font-family="KaiTi, SimKai" font-size="20" fill="#333">
    <tspan x="50" dy="0">一款为你的钱包施展</tspan>
    <tspan x="50" dy="40">瘦身魔法的智能镜子，</tspan>
    <tspan x="50" dy="40">让你在虚拟繁荣中</tspan>
    <tspan x="50" dy="40">体验真实贫穷。</tspan>
  </text>
</svg>"`,
        },
        {
          role: "user",
          content: inputWord,
        },
      ],
      model: "gpt-4o-2024-08-06",
      response_format: {
        type: "json_schema",
        json_schema: {
          name:"SvgCode",
          schema:{
            type: "object",
            properties:{
              Svg:{type: "string"}
            },
            required: ["Svg"],
            additionalProperties: false
          },
          strict: true
        },
      }
    });

    console.log(response, "怎么回事");



    console.log("resp: ", response.choices[0].message.content);

    return NextResponse.json({ data: response.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching SVG:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
