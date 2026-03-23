const METRICS = [
  { label: 'Total Revenue',   value: '£45,231',  delta: '+20.1%', positive: true,  sub: 'vs last month' },
  { label: 'Active Orders',   value: '124',      delta: '+8',     positive: true,  sub: '12 pending fulfilment' },
  { label: 'Total Products',  value: '48',       delta: '-3',     positive: false, sub: '3 out of stock' },
  { label: 'New Customers',   value: '1,429',    delta: '+12.5%', positive: true,  sub: 'this month' },
];

const ORDERS = [
  { id: '#ORD-9001', customer: 'salma.a@example.com',  status: 'Processing', amount: '£99.00' },
  { id: '#ORD-9002', customer: 'james.k@example.com',  status: 'Shipped',    amount: '£254.00' },
  { id: '#ORD-9003', customer: 'nina.w@example.com',   status: 'Delivered',  amount: '£120.00' },
  { id: '#ORD-9004', customer: 'alex.m@example.com',   status: 'Processing', amount: '£140.00' },
];

const STATUS_STYLES: Record<string, string> = {
  Processing: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Shipped:    'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Delivered:  'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold italic mb-2" style={{color: 'var(--brand-red)'}}>✦ Admin Control</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white uppercase tracking-wider">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">Welcome back — here is what is happening today.</p>
        <div className="w-12 h-0.5 mt-4 bg-black dark:bg-white" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">{m.label}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{m.value}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`text-xs font-semibold`} style={{color: m.positive ? 'var(--brand-blue)' : 'var(--brand-orange)'}}>{m.delta}</span>
              <span className="text-xs text-gray-400">{m.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h2>
          <button className="text-xs font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors">View all →</button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-[#0a0a0a]">
              <tr>
                {['Order ID', 'Customer', 'Status', 'Amount'].map((h) => (
                  <th key={h} scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-black">
              {ORDERS.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-mono font-medium text-gray-900 dark:text-white">{o.id}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{o.customer}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Add New Product', icon: '＋' },
          { label: 'Export Orders',   icon: '↗' },
          { label: 'Manage Users',    icon: '⊙' },
        ].map((action) => (
          <button key={action.label} className="flex items-center gap-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <span className="text-lg text-gray-400">{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
