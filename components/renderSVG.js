"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function ShadcnSVGRenderer() {
  const [svgCode, setSvgCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(event.target);
    const inputWord = formData.get("inputWord");

    try {
      const response = await fetch("/api/getSvg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputWord }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const svgObj = JSON.parse(data.data);
      setSvgCode(svgObj.Svg);
    } catch (error) {
      console.error("Error fetching SVG:", error);
      setError("获取 SVG 时出错。请稍后重试。");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">汉语新解</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                name="inputWord"
                placeholder="说吧，他们又用哪个词来忽悠你了？"
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? '加载中' : '提交'}
              </Button>
            </div>
          </form>
          
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {svgCode && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg overflow-hidden">
              <div className="w-full max-w-full overflow-auto" style={{ maxHeight: '60vh' }}>
                <div dangerouslySetInnerHTML={{ __html: svgCode }} className="mx-auto" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}