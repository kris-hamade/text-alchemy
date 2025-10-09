# Contributing to Text Alchemy

Thank you for your interest in contributing to Text Alchemy! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm
- Git

### Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/text-alchemy.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Add JSDoc comments for new functions
- Keep functions focused and single-purpose

### Testing Requirements
- All new features must include tests
- Maintain or improve test coverage
- Test edge cases and error conditions
- Include integration tests for complex features

## Pull Request Process

1. **Create a feature branch** from `main`
2. **Write tests** for your changes
3. **Ensure all tests pass** (`npm test`)
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

### Pull Request Guidelines
- Use descriptive commit messages
- Reference any related issues
- Include screenshots for UI changes
- Keep PRs focused and atomic
- Update README.md if adding new features

## Feature Requests

When suggesting new features:
- Check existing issues first
- Provide clear use cases
- Consider backward compatibility
- Think about API design

## Bug Reports

When reporting bugs:
- Use the issue template
- Include steps to reproduce
- Provide expected vs actual behavior
- Include environment details (Node.js version, OS)

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow the golden rule

## Release Process

### For Maintainers

1. **Create version tag:**
   ```bash
   # Create a git tag for the version you want
   git tag v1.0.0
   git push origin v1.0.0
   
   # Or for prerelease versions
   git tag v1.0.0-alpha.5
   git push origin v1.0.0-alpha.5
   ```

2. **Automatic publishing:**
   - The CI pipeline runs tests and builds on every push to main/develop
   - The publish workflow automatically extracts the version from the git tag and updates package.json
   - Publishing to NPM happens automatically when you push a version tag
   - No manual intervention required after creating the tag

### Version Tag Format

- **Stable releases**: `v1.0.0`, `v1.1.0`, `v2.0.0`
- **Prerelease versions**: `v1.0.0-alpha.1`, `v1.0.0-beta.5`, `v1.0.0-rc.1`

### Release Requirements

- Tests must pass before publishing
- Semantic versioning is used
- Version tags trigger automatic NPM publishing

## Questions?

Feel free to open an issue for questions or discussions!
