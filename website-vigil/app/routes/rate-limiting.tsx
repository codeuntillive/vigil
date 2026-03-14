import type { Route } from "./+types/rate-limiting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rate Limiting - VIGIL" },
    { name: "description", content: "Learn how to use VIGIL's rate limiting middleware to control request frequency and prevent abuse." },
  ];
}

export default function RateLimiting() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12" style={{ paddingTop: '80px' }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rate Limiting</h1>
          <p className="text-gray-600">Control request frequency to prevent abuse</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
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
                  <td className="py-2 px-4">mode</td>
                  <td className="py-2 px-4">'LIVE' | 'TEST'</td>
                  <td className="py-2 px-4">'LIVE'</td>
                  <td className="py-2 px-4">Enable/disable</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">by</td>
                  <td className="py-2 px-4">string</td>
                  <td className="py-2 px-4">'ip'</td>
                  <td className="py-2 px-4">Identifier type</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">ipPrimary</td>
                  <td className="py-2 px-4">boolean</td>
                  <td className="py-2 px-4">true</td>
                  <td className="py-2 px-4">IP is primary key</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">refillRate</td>
                  <td className="py-2 px-4">number</td>
                  <td className="py-2 px-4">5</td>
                  <td className="py-2 px-4">Tokens/interval</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">interval</td>
                  <td className="py-2 px-4">number</td>
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">Seconds</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">capacity</td>
                  <td className="py-2 px-4">number</td>
                  <td className="py-2 px-4">10</td>
                  <td className="py-2 px-4">Max tokens</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Response (Success)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-800 text-white p-3 rounded text-sm">
{`HTTP/1.1 200 OK
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1773318895`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Response (Rate Limited)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-800 text-white p-3 rounded text-sm">
{`HTTP/1.1 429 Too Many Requests

{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again later.",
  "retryAfter": 10
}`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuration Examples</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3">Basic Configuration</h3>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm">
{`// Simple rate limiting
app.use(ratelimiting({ mode: 'LIVE', capacity: 10 }));`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3">User-Based Rate Limiting</h3>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm">
{`// Rate limit per user
app.use(ratelimiting({
  mode: 'LIVE',
  by: 'userId',
  refillRate: 10,
  interval: 60,
  capacity: 100
}));`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3">Strict Rate Limiting</h3>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm">
{`// Strict rate limiting with lower limits
app.use(ratelimiting({
  mode: 'LIVE',
  by: 'ip',
  refillRate: 1,
  interval: 10,
  capacity: 5
}));`}
              </pre>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}