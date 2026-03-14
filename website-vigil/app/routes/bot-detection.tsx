import type { Route } from "./+types/bot-detection";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bot Detection - VIGIL" },
    { name: "description", content: "Learn how to use VIGIL's bot detection middleware to identify and block unwanted bots." },
  ];
}

export default function BotDetection() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12" style={{ paddingTop: '80px' }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bot Detection</h1>
          <p className="text-gray-600">Identify and block unwanted bots</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const { botDetection } = require('vigil');

app.use(botDetection({
  mode: 'LIVE',
  searchEngine: ['google', 'bing', 'yahoo']
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
                  <td className="py-2 px-4">searchEngine</td>
                  <td className="py-2 px-4">string[]</td>
                  <td className="py-2 px-4">All</td>
                  <td className="py-2 px-4">Allowed engines</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">allowList</td>
                  <td className="py-2 px-4">array</td>
                  <td className="py-2 px-4">[]</td>
                  <td className="py-2 px-4">Always allowed</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">blockList</td>
                  <td className="py-2 px-4">array</td>
                  <td className="py-2 px-4">[]</td>
                  <td className="py-2 px-4">Always blocked</td>
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
X-Bot-Detected: true
X-Search-Engine: google`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Response (Blocked)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-800 text-white p-3 rounded text-sm">
{`HTTP/1.1 403 Forbidden

{
  "error": "Forbidden",
  "message": "Search engine bots are not allowed."
}`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Utility</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 mb-4">You can also use the detect function directly to check User-Agents:</p>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm">
{`// Detect bot from User-Agent
botDetection.detect('Googlebot/2.1');
// Returns: { isBot: true, botName: 'Googlebot', searchEngine: 'google' }`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuration Examples</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3">Allow Specific Search Engines</h3>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm">
{`// Allow only Google bot
app.use(botDetection({
  mode: 'LIVE',
  searchEngine: ['google']
}));`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3">Custom Allow List</h3>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm">
{`// Allow specific user agents
app.use(botDetection({
  mode: 'LIVE',
  allowList: ['my-custom-bot', 'internal-bot']
}));`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3">Block Specific Bots</h3>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm">
{`// Block specific bots
app.use(botDetection({
  mode: 'LIVE',
  blockList: ['bad-bot', 'suspicious-bot']
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