import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import ReactMarkdown from 'react-markdown';

// Basic Prism theme (no specific language import)
import 'prismjs/themes/prism.css';

import axios from 'axios';

function Codearena() {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    int num1, num2, sum;
    cin >> num1 >> num2;
    sum = num1 + num2;
    cout << "The sum of the two numbers is: " << sum;
    return 0;
}`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [aiReview, setAiReview] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const handleRun = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/run`, {
        language: 'cpp',
        code,
        input,
      });
      setOutput(data.output);
    } catch (error) {
      setOutput('Error executing code, error: ' + error.message);
    }
  };

  const handleAiReview = async () => {
    try {
      setLoadingAi(true);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai-review`, { code });
      setAiReview(data.review);
    } catch (error) {
      setAiReview('Error in AI review, error: ' + error.message);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Aman's Online Code Compiler</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Editor */}
        <div className="bg-white shadow-lg rounded-lg p-4 h-full flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Code Editor</h2>
          <div className="bg-gray-100 rounded-lg overflow-y-auto flex-grow" style={{ height: '500px' }}>
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => Prism.highlight(code, Prism.languages.clike || Prism.languages.javascript, 'clike')}
              padding={15}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 14,
                minHeight: '500px',
              }}
            />
          </div>
        </div>

        {/* Input / Output / AI Review */}
        <div className="flex flex-col gap-4">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Input</h2>
            <textarea
              rows="4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input values..."
              className="w-full p-3 text-sm border border-gray-300 rounded-md resize-none"
            />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4 overflow-y-auto" style={{ height: '150px' }}>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Output</h2>
            <div className="text-sm font-mono whitespace-pre-wrap text-gray-800">{output}</div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">AI Review</h2>
            <div className="prose prose-sm text-gray-800 overflow-y-auto" style={{ height: '150px' }}>
              {loadingAi ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : aiReview === '' ? (
                <div>🤖</div>
              ) : (
                <ReactMarkdown>{aiReview}</ReactMarkdown>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <button
              onClick={handleRun}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Run
            </button>
            <button
              onClick={handleAiReview}
              className={`flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition ${
                loadingAi ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loadingAi}
            >
              {loadingAi ? 'Loading...' : 'AI Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Codearena;
