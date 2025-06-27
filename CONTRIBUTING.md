# Contributing to JigarafyPro

Thank you for your interest in contributing to JigarafyPro! We welcome contributions from the community and are pleased to have you join us.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- MongoDB 6.0 or higher
- Git
- A GitHub account

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/jigarafypro.git
   cd jigarafypro
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Fill in the required environment variables

4. **Start development servers**
   ```bash
   # Backend (in backend directory)
   npm run dev

   # Frontend (in frontend directory)
   npm run dev
   ```

## 🎯 How to Contribute

### Reporting Bugs
- Use the GitHub issue tracker
- Include detailed steps to reproduce
- Provide system information and error messages
- Add screenshots if applicable

### Suggesting Features
- Open an issue with the "feature request" label
- Describe the feature and its benefits
- Provide mockups or examples if possible

### Code Contributions

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing new feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Use a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

## 📝 Coding Standards

### Frontend (React)
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety
- Implement responsive design
- Use TailwindCSS for styling

### Backend (Node.js)
- Use async/await for asynchronous operations
- Implement proper error handling
- Follow RESTful API conventions
- Add input validation
- Write comprehensive tests

### General Guidelines
- Write clear, self-documenting code
- Add comments for complex logic
- Use meaningful variable and function names
- Keep functions small and focused
- Follow the existing code style

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Writing Tests
- Write unit tests for new functions
- Add integration tests for API endpoints
- Include component tests for React components
- Ensure good test coverage

## 📚 Documentation

- Update README.md for new features
- Add JSDoc comments for functions
- Update API documentation
- Include examples in documentation

## 🔄 Pull Request Process

1. Ensure your code follows the style guidelines
2. Update documentation as needed
3. Add or update tests
4. Ensure all tests pass
5. Request review from maintainers

## 📋 Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed

## 🤝 Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

## 📞 Getting Help

- Join our Discord server
- Check existing issues and discussions
- Email: contribute@jigarafypro.com

Thank you for contributing to JigarafyPro! 🎉
