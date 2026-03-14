import type { Route } from "./+types/sql-injection";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SQL Injection Protection - VIGIL" },
    { name: "description", content: "Learn how to use VIGIL's SQL injection protection middleware to prevent SQL injection attacks." },
  ];
}

export default function SqlInjection() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12" style={{ paddingTop: '80px' }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SQL Injection Protection</h1>
          <p className="text-gray-600">Prevent SQL injection attacks</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const sqlinjection = require('vigil/sql-injection');

// Direct check
const result = await sqlinjection({ text: userInput });

// As middleware
app.use(sqlinjection.middleware({ mode: 'LIVE' }));`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Options</h2>
          <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold">Option</th>
                  <th className="text-left py-2 px-4 font-semibold">Type</th>
                  <th className="text-left py-2 px-4 font-semibold">Default</th>
                  <th className="text-left py-2 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">text</td>
                  <td className="py-2 px-4">string</td>
                  <td className="py-2 px-4">-</td>
                  <td className="py-2 px-4">Text to check</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">data</td>
                  <td className="py-2 px-4">object</td>
                  <td className="py-2 px-4">-</td>
                  <td className="py-2 px-4">Object to scan</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">checkBody</td>
                  <td className="py-2 px-4">boolean</td>
                  <td className="py-2 px-4">true</td>
                  <td className="py-2 px-4">Check body</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Response (Safe Input)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-800 text-white p-3 rounded text-sm">
{`{
  "detected": false,
  "safe": true,
  "threats": [],
  "errors": []
}`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Response (Threat Detected)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-800 text-white p-3 rounded text-sm">
{`{
  "detected": true,
  "safe": false,
  "threats": [
    {
      "type": "text",
      "value": "'; OR 1=1--",
      "detected": true,
      "patterns": [
        {
          "pattern": "/\\bOR\\s+1\\s*=\\s*1/i",
          "matched": "OR 1=1"
        }
      ]
    }
  ],
  "errors": []
}`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Response (Middleware - 400 Bad Request)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-800 text-white p-3 rounded text-sm">
{`HTTP/1.1 400 Bad Request

{
  "error": "Potential SQL injection detected",
  "message": "Your input contains potentially dangerous characters"
}`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuration Examples</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3">Basic Usage</h3>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm">
{`// Check single input
const result = await sqlinjection({ text: userInput });
if (!result.safe) {
  console.log('SQL injection detected!');
}`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3">Check Multiple Fields</h3>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm">
{`// Check multiple fields in an object
const result = await sqlinjection({ 
  data: {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
});`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3">Express Middleware</h3>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm">
{`// Use as Express middleware
app.use(sqlinjection.middleware({ mode: 'LIVE' }));

// All requests will be checked for SQL injection
// Invalid requests will receive a 400 response`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detected Patterns</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 mb-4">VIGIL detects the following SQL injection patterns:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>OR 1=1 attacks</li>
              <li>UNION SELECT statements</li>
              <li>DROP TABLE commands</li>
              <li>DELETE FROM commands</li>
              <li>INSERT INTO commands</li>
              <li>Comment-based attacks (--, /* */)</li>
              <li>AND-based attacks</li>
              <li>Various SQL keywords and operators</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}