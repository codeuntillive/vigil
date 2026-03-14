import type { Route } from "./+types/getting-started";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Getting Started - VIGIL" },
    { name: "description", content: "Quick start guide for VIGIL security middleware. Learn how to install and configure rate limiting, bot detection, email verification, and SQL injection protection." },
  ];
}

export default function GettingStarted() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Getting Started with VIGIL</h1>
          <p className="text-gray-600">Quick start guide for VIGIL security middleware</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Installation</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <code className="bg-gray-900 text-white px-4 py-2 rounded block">npm install vigil</code>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Example</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const express = require('express');
const { ratelimiting, botDetection, emailVerification, sqlinjection } = require('vigil');

const app = express();
app.use(express.json());

// Rate limiting (IP-primary - prevents bypass)
app.use(ratelimiting({ mode: 'LIVE', capacity: 10 }));

// Bot detection
app.use(botDetection({ mode: 'LIVE', searchEngine: ['google'] }));

// Email verification middleware
app.use(emailVerification.middleware({
  source: 'body',
  checkMX: true,
  checkDisposable: true
}));

// Routes
app.post('/api/register', (req, res) => {
  // Email already verified by middleware
  const emailResult = req.emailVerification;
  if (!emailResult.valid) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  // Check SQL injection
  const sqlResult = await sqlinjection({ data: req.body });
  if (!sqlResult.safe) {
    return res.status(400).json({ error: 'SQL injection detected' });
  }
  
  res.json({ success: true });
});

app.listen(3000);`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">1. Rate Limiting</h3>
              <p className="text-gray-600 mb-4">Control request frequency to prevent abuse</p>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded mb-4 text-sm">
{`const { ratelimiting } = require('vigil');
app.use(ratelimiting({
  mode: 'LIVE',
  by: 'userId',
  refillRate: 5,
  interval: 10,
  capacity: 10
}));`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">2. Bot Detection</h3>
              <p className="text-gray-600 mb-4">Identify and block unwanted bots</p>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded mb-4 text-sm">
{`const { botDetection } = require('vigil');
app.use(botDetection({
  mode: 'LIVE',
  searchEngine: ['google', 'bing', 'yahoo']
}));`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">3. Email Verification</h3>
              <p className="text-gray-600 mb-4">Validate email addresses and block disposable emails</p>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded mb-4 text-sm">
{`const { emailVerification } = require('vigil');

// Direct verification
const result = await emailVerification({ 
  email: 'user@example.com',
  checkMX: true
});`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-3">4. SQL Injection Protection</h3>
              <p className="text-gray-600 mb-4">Prevent SQL injection attacks</p>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded mb-4 text-sm">
{`const sqlinjection = require('vigil/sql-injection');

// Direct check
const result = await sqlinjection({ text: userInput });`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Module Options</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-3">Rate Limiting Options</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-medium">mode</p>
                <p className="text-gray-600">'LIVE' | 'TEST'</p>
              </div>
              <div>
                <p className="font-medium">by</p>
                <p className="text-gray-600">'ip' | 'userId'</p>
              </div>
              <div>
                <p className="font-medium">refillRate</p>
                <p className="text-gray-600">number</p>
              </div>
              <div>
                <p className="font-medium">interval</p>
                <p className="text-gray-600">seconds</p>
              </div>
              <div>
                <p className="font-medium">capacity</p>
                <p className="text-gray-600">number</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Response Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3">Rate Limited Response</h3>
              <pre className="bg-gray-800 text-white p-3 rounded text-sm">
{`HTTP/1.1 429 Too Many Requests

{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again later.",
  "retryAfter": 10
}`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3">Valid Email Response</h3>
              <pre className="bg-gray-800 text-white p-3 rounded text-sm">
{`{
  "email": "test@gmail.com",
  "valid": true,
  "exists": true,
  "hasMX": true,
  "isDisposable": false,
  "isValidFormat": true,
  "isReserved": false,
  "mxRecords": [...],
  "errors": []
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <ol className="space-y-2 text-gray-700">
              <li><span className="font-medium">Install VIGIL:</span> <code className="bg-gray-100 px-2 py-1 rounded">npm install vigil</code></li>
              <li><span className="font-medium">Choose modules:</span> Select the security features you need</li>
              <li><span className="font-medium">Configure options:</span> Set up module-specific options</li>
              <li><span className="font-medium">Add to Express:</span> Use <code className="bg-gray-100 px-2 py-1 rounded">app.use()</code> to add middleware</li>
              <li><span className="font-medium">Test:</span> Verify your configuration works as expected</li>
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}