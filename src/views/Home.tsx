import React from "react";
import { Link } from "@tanstack/react-router";
import { MaterialIcon } from "../components/common/MaterialIcon";

export const Home: React.FC = () => {
  const features = [
    {
      title: "AST Power Search",
      description:
        "Search and analyze your code's Abstract Syntax Tree with powerful filtering and visualization tools.",
      icon: "search",
      path: "/ast_power_search",
      color: "bg-blue-500",
    },
    {
      title: "Dev Tools",
      description: "Advanced development utilities for code analysis, refactoring, and debugging.",
      icon: "code",
      path: "/dev_tools",
      color: "bg-green-500",
    },
    {
      title: "Settings",
      description: "Customize your experience with themes and preferences.",
      icon: "settings",
      path: "/settings",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Refactor Toolbox
          </h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive toolkit for code analysis, refactoring, and purposeful development.
            Explore your codebase with powerful AST visualization and advanced development tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <Link key={feature.title} to={feature.path} className="group block">
              <div className="bg-base-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-base-300 hover:border-primary/30">
                <div
                  className={`w-16 h-16 rounded-lg ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <MaterialIcon name={feature.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">{feature.description}</p>
                <div className="mt-6 flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Get Started</span>
                  <MaterialIcon name="arrow_forward" className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Start Section */}
        <div className="bg-base-100 rounded-xl p-8 shadow-lg border border-base-300">
          <h2 className="text-3xl font-bold mb-6 text-center">Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MaterialIcon name="upload_file" className="mr-3 text-primary" />
                Upload Your Code
              </h3>
              <p className="text-base-content/70 mb-4">
                Start by uploading your JavaScript, TypeScript, or other supported files to begin
                analyzing your codebase.
              </p>
              <ul className="space-y-2 text-sm text-base-content/60">
                <li>• Supported: JavaScript, TypeScript, JSX, TSX</li>
                <li>• Drag and drop interface</li>
                <li>• Multiple file upload</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MaterialIcon name="analytics" className="mr-3 text-primary" />
                Analyze & Refactor
              </h3>
              <p className="text-base-content/70 mb-4">
                Use our powerful AST tools to understand your code structure and identify
                refactoring opportunities.
              </p>
              <ul className="space-y-2 text-sm text-base-content/60">
                <li>• Visual AST exploration</li>
                <li>• Advanced search and filtering</li>
                <li>• Refactoring suggestions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <p className="text-base-content/60 mb-4">Ready to transform your codebase?</p>
          <Link to="/ast_power_search" className="btn btn-primary btn-lg">
            <MaterialIcon name="rocket_launch" className="mr-2" />
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
};
