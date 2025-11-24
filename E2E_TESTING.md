# End-to-End Testing with Playwright

This document provides instructions for setting up and running end-to-end tests for the fourHundred NFT Gallery using Playwright.

## Prerequisites

- Node.js 18.0 or later
- npm or yarn

## Setup

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npm run test:e2e:install
```

## Running Tests

### Run all tests in headless mode:

```bash
npm run test:e2e
```

### Run tests in headed mode (with visible browser):

```bash
npm run test:e2e:headed
```

### Run tests with the Playwright UI:

```bash
npm run test:e2e:ui
```

## Test Structure

Tests are located in the `e2e/` directory:

- `app.spec.ts` - Tests for the main application functionality

## Writing Tests

When writing new tests, follow these guidelines:

1. Use descriptive test names
2. Group related tests together
3. Use Playwright's built-in assertions
4. Take screenshots on failure for debugging
5. Use data-testid attributes for selecting elements

## Debugging

### Debugging with the Playwright Inspector:

```bash
npx playwright test --debug
```

### Debugging with the Playwright UI:

```bash
npm run test:e2e:ui
```

### Viewing test reports:

After running tests, a report will be generated in the `playwright-report/` directory. Open `index.html` in your browser to view the report.

## Continuous Integration

The tests are configured to run in CI environments. The following environment variables are used:

- `CI` - Set to `true` in CI environments
- `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` - For Playwright service integration (optional)

## Troubleshooting

### Common Issues:

1. **Tests fail with "browser not found" error**:
   - Run `npm run test:e2e:install` to install the required browsers

2. **Tests fail with "timeout" error**:
   - Increase the timeout in the test configuration
   - Check if the application is running on the correct port

3. **Tests fail with "element not found" error**:
   - Make sure the element has a `data-testid` attribute
   - Use the Playwright UI to debug the test

### Getting Help:

- Check the [Playwright documentation](https://playwright.dev/)
- Open an issue in the project repository