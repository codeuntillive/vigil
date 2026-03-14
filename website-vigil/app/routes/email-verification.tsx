import type { Route } from "./+types/email-verification";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Email Verification - VIGIL" },
    { name: "description", content: "Learn how to use VIGIL's email verification middleware to validate email addresses and block disposable emails." },
  ];
}

export default function EmailVerification() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12" style={{ paddingTop: '80px' }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Email Verification</h1>
          <p className="text-gray-600">Validate email addresses and block disposable emails</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage (Direct Verification)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const emailVerification = require('vigil/email-verification');

const result = await emailVerification({ 
  email: 'user@example.com',
  checkMX: true
});`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage (Express Middleware)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`const { emailVerification } = require('vigil');

// Add email verification middleware
app.use(emailVerification.middleware({
  source: 'body',        // Get email from: 'body', 'query', 'params', 'header'
  emailField: 'email',   // Field name (for body/query/params)
  checkMX: true,         // Check MX records
  checkDisposable: true, // Check disposable emails
  blockOnDisposable: true // Block requests with disposable emails
}));

// Then use req.emailVerification in your routes
app.post('/api/register', (req, res) => {
  const verification = req.emailVerification;
  // verification = { email, valid, exists, hasMX, isDisposable, ... }
  res.json(verification);
});`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Options (Direct)</h2>
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
                  <td className="py-2 px-4">email</td>
                  <td className="py-2 px-4">string</td>
                  <td className="py-2 px-4">required</td>
                  <td className="py-2 px-4">Email to verify</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">checkMX</td>
                  <td className="py-2 px-4">boolean</td>
                  <td className="py-2 px-4">true</td>
                  <td className="py-2 px-4">Check MX records</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">checkDisposable</td>
                  <td className="py-2 px-4">boolean</td>
                  <td className="py-2 px-4">true</td>
                  <td className="py-2 px-4">Block disposable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Options (Middleware)</h2>
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
                  <td className="py-2 px-4">source</td>
                  <td className="py-2 px-4">'body' | 'query' | 'params' | 'header'</td>
                  <td className="py-2 px-4">'body'</td>
                  <td className="py-2 px-4">Where to get email from</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">emailField</td>
                  <td className="py-2 px-4">string</td>
                  <td className="py-2 px-4">'email'</td>
                  <td className="py-2 px-4">Field name (body/query/params)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">headerName</td>
                  <td className="py-2 px-4">string</td>
                  <td className="py-2 px-4">'x-email'</td>
                  <td className="py-2 px-4">Header name (if source is 'header')</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">checkMX</td>
                  <td className="py-2 px-4">boolean</td>
                  <td className="py-2 px-4">true</td>
                  <td className="py-2 px-4">Check MX records</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">checkDisposable</td>
                  <td className="py-2 px-4">boolean</td>
                  <td className="py-2 px-4">true</td>
                  <td className="py-2 px-4">Check disposable emails</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">blockOnDisposable</td>
                  <td className="py-2 px-4">boolean</td>
                  <td className="py-2 px-4">true</td>
                  <td className="py-2 px-4">Block disposable emails</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">handler</td>
                  <td className="py-2 px-4">function</td>
                  <td className="py-2 px-4">null</td>
                  <td className="py-2 px-4">Custom handler for invalid emails</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Response (Valid Email)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-800 text-white p-3 rounded text-sm">
{`{
  "email": "test@gmail.com",
  "valid": true,
  "exists": true,
  "hasMX": true,
  "isDisposable": false,
  "isValidFormat": true,
  "isReserved": false,
  "mxRecords": [
    { "host": "gmail-smtp-in.l.google.com", "priority": 5 },
    { "host": "alt1.gmail-smtp-in.l.google.com", "priority": 10 }
  ],
  "errors": []
}`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Response (Disposable Email)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-800 text-white p-3 rounded text-sm">
{`{
  "email": "test@mailinator.com",
  "valid": false,
  "exists": false,
  "hasMX": false,
  "isDisposable": true,
  "isValidFormat": true,
  "isReserved": false,
  "mxRecords": [],
  "errors": ["Disposable email domain"]
}`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Response (Invalid Format)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-800 text-white p-3 rounded text-sm">
{`{
  "email": "invalid-email",
  "valid": false,
  "exists": false,
  "hasMX": false,
  "isDisposable": false,
  "isValidFormat": false,
  "isReserved": false,
  "mxRecords": [],
  "errors": ["Invalid email format"]
}`}
            </pre>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}