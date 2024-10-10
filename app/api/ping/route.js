import { NextResponse } from 'next/server'
export async function GET() {
    const response = await fetch('https://api.nextapi.fun/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`, // 确保在环境变量中设置了你的 OpenAI API 密钥
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // 确保使用你有权限的模型
          messages: [{ role: 'user', content: 'ping' }],
        }),
      });
  
      const data = await response.json();
  
      return NextResponse.json({ data })
}