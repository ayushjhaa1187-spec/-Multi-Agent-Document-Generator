import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header / Nav */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔷</span>
            <span className="font-bold text-xl tracking-tight text-gray-900">BRD AGENT</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-4xl w-full space-y-12">

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
              Transform Scattered Communications
              <br />
              <span className="text-blue-600">Into Structured Requirements</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Automate the creation of Business Requirement Documents (BRDs) from emails, transcripts, and chat logs with multi-agent AI.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600">500K+</div>
              <div className="text-sm font-medium text-gray-500 mt-1">Emails Processed</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600">279</div>
              <div className="text-sm font-medium text-gray-500 mt-1">Transcripts Parsed</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600">92%</div>
              <div className="text-sm font-medium text-gray-500 mt-1">Accuracy</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600">&lt;3s</div>
              <div className="text-sm font-medium text-gray-500 mt-1">Latency</div>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/signup"
              className="px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Get Started →
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 text-lg font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              View Demo
            </Link>
          </div>

          {/* OAuth Placeholder */}
          <div className="pt-8 border-t border-gray-200 max-w-md mx-auto w-full">
            <p className="text-sm text-gray-500 mb-4">Or sign in with</p>
            <div className="flex justify-center gap-4">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm hover:bg-gray-50">
                Google
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm hover:bg-gray-50">
                GitHub
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm hover:bg-gray-50">
                Email
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        <p>© 2024 Team Wesolve_foru | HackFest 2.0 | GDG Cloud New Delhi</p>
      </footer>
    </div>
  );
}
