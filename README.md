# Gleee - Directory Structure Generator

A simple CLI tool that generates directory structure in either ASCII tree format or JSON format.

## Features

- Generate directory structure in ASCII tree format
- Generate directory structure in JSON format (AI/Machine friendly)
- Support recursive directory listing
- Simple and easy to use
- Generate AI-friendly JSON structure for better GitHub Copilot integration
- Respect .gitignore patterns
- Automatically excludes .git directory

## Why Gleee?

### Enhanced GitHub Copilot Integration

One of the main challenges when working with GitHub Copilot is that it lacks context about your project structure. While Copilot is excellent at understanding code within a single file, it often struggles with:

1. Understanding the overall project structure
2. Relationships between files and directories
3. Identifying available modules and dependencies
4. Suggesting imports from your project's files

Glee helps solve these issues by:

- Providing structured project information in formats that AI tools can easily process
- Generating JSON output that can be included in prompts to Copilot
- Creating clear, hierarchical representations of your project structure

## Installation

### Using npm

```sh
npm install -g gleee
```

### Using yarn

```sh
yarn global add gleee
```

## Usage

```sh
gleee [options] [directory] [output-file]
```

### Examples

1. Generate tree structure for current directory:
```sh
gleee .
```

2. Generate JSON structure for a specific directory:
```sh
gleee /path/to/project output.json
```

3. Save tree structure to custom file:
```sh
gleee . project-structure.md
```

### Sample Outputs

#### Markdown Tree Output
```
# Directory Listing for /project
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── Footer.js
│   └── index.js
├── package.json
└── README.md
```

#### JSON Output
```json
{
  "rootPath": "/project",
  "timestamp": "2025-01-29T14:37:48.502Z",
  "structure": [
    {
      "name": "src",
      "type": "directory",
      "children": [
        {
          "name": "components",
          "type": "directory",
          "children": [
            {
              "name": "Header.js",
              "type": "file"
            },
            {
              "name": "Footer.js",
              "type": "file"
            }
          ]
        },
        {
          "name": "index.js",
          "type": "file"
        }
      ]
    }
  ]
}
```

## Tips

- Use .gitignore to exclude unwanted files/directories
- JSON output is ideal for programmatic processing
- Markdown output is great for documentation
