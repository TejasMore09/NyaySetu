export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8">
        ⚖ AI Contract Scanner
      </h2>

      <nav className="space-y-4 text-sm">
        <div className="text-blue-400">Dashboard</div>
        <div className="text-gray-400">Reports</div>
        <div className="text-gray-400">History</div>
        <div className="text-gray-400">Settings</div>
      </nav>
    </aside>
  );
}
