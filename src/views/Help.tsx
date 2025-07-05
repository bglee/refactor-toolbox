import React, { useState } from "react";
import { MaterialIcon } from "../components/common/MaterialIcon";

interface FAQItem {
  question: string;
  answer: string;
}

export const Help: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "What file types are supported?",
      answer:
        "Currently, Refactor Toolbox supports JavaScript (.js), TypeScript (.ts), JSX (.jsx), and TSX (.tsx) files. We're working on adding support for more languages including Go, Java, and others.",
    },
    {
      question: "How do I use the AST Power Search?",
      answer:
        "Upload your code files using the file selector, then use the search and filter tools to explore your Abstract Syntax Tree. You can search by node types, properties, or use plain text search across all AST nodes.",
    },
    {
      question: "What is an Abstract Syntax Tree (AST)?",
      answer:
        "An AST is a tree representation of the abstract syntactic structure of source code. Each node represents a construct in the source code, making it easier to analyze and understand code structure programmatically.",
    },
    {
      question: "How do I change themes?",
      answer:
        "Go to Settings and select your preferred theme from the available options. The theme will be automatically saved and applied across the application.",
    },
    {
      question: "Can I export my analysis results?",
      answer:
        "Currently, analysis results are view-only within the application. We're working on adding export functionality for reports and findings.",
    },
    {
      question: "Is my code uploaded to any servers?",
      answer:
        "No, all code analysis happens locally in your browser. Your code never leaves your machine, ensuring complete privacy and security.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-center">
            <MaterialIcon name="help" className="mr-4" />
            Help & Documentation
          </h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto leading-relaxed">
            Learn how to use Refactor Toolbox effectively and find answers to common questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Start Guide */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-xl p-8 shadow-lg border border-base-300 mb-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <MaterialIcon name="rocket_launch" className="mr-3 text-primary" />
                Quick Start Guide
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Upload Your Code</h3>
                    <p className="text-base-content/70">
                      Start by uploading your JavaScript, TypeScript, JSX, or TSX files using the
                      file selector. You can drag and drop files or click to browse.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Explore the AST</h3>
                    <p className="text-base-content/70">
                      Once uploaded, your code will be parsed into an Abstract Syntax Tree. Navigate
                      through the tree structure to understand your code's organization.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Search and Filter</h3>
                    <p className="text-base-content/70">
                      Use the search and filter tools to find specific code patterns, function
                      definitions, or any other AST nodes you're interested in.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Analyze and Refactor</h3>
                    <p className="text-base-content/70">
                      Identify refactoring opportunities, understand code complexity, and make
                      informed decisions about your codebase structure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Overview */}
            <div className="bg-base-100 rounded-xl p-8 shadow-lg border border-base-300">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <MaterialIcon name="featured_play_list" className="mr-3 text-primary" />
                Features Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <MaterialIcon name="search" className="mr-2 text-blue-500" />
                    AST Power Search
                  </h3>
                  <ul className="space-y-2 text-base-content/70">
                    <li>• Visual AST exploration</li>
                    <li>• Advanced filtering by node types</li>
                    <li>• Plain text search across all properties</li>
                    <li>• Real-time search results</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <MaterialIcon name="code" className="mr-2 text-green-500" />
                    Dev Tools
                  </h3>
                  <ul className="space-y-2 text-base-content/70">
                    <li>• Code analysis utilities</li>
                    <li>• Performance monitoring</li>
                    <li>• Debugging assistance</li>
                    <li>• Development workflow tools</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <MaterialIcon name="visibility" className="mr-2 text-purple-500" />
                    Visibility Controls
                  </h3>
                  <ul className="space-y-2 text-base-content/70">
                    <li>• Show/hide specific node types</li>
                    <li>• Customize tree view</li>
                    <li>• Focus on relevant information</li>
                    <li>• Personalized viewing experience</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <MaterialIcon name="settings" className="mr-2 text-orange-500" />
                    Customization
                  </h3>
                  <ul className="space-y-2 text-base-content/70">
                    <li>• Multiple theme options</li>
                    <li>• Customizable interface</li>
                    <li>• User preferences</li>
                    <li>• Accessibility features</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-xl p-8 shadow-lg border border-base-300 sticky top-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <MaterialIcon name="quiz" className="mr-3 text-primary" />
                FAQ
              </h2>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-base-300 rounded-lg overflow-hidden">
                    <button
                      className="w-full p-4 text-left bg-base-200 hover:bg-base-300 transition-colors flex items-center justify-between"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="font-medium text-base-content">{item.question}</span>
                      <MaterialIcon
                        name={expandedFAQ === index ? "expand_less" : "expand_more"}
                        className="text-base-content/60"
                      />
                    </button>
                    {expandedFAQ === index && (
                      <div className="p-4 bg-base-100 border-t border-base-300">
                        <p className="text-base-content/70 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
