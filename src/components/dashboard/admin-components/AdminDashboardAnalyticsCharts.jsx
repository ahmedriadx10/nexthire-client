"use client";

import { useSyncExternalStore } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FiTrendingUp, FiBriefcase, FiUsers } from "react-icons/fi";

const emptySubscribe = () => () => {};

/**
 * Custom hook to safely determine client-side mounting without setState in useEffect
 */
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
};

/**
 * Custom dark theme tooltip for Recharts
 */
const CustomTooltip = ({ active, payload, label, unitLabel }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/95 backdrop-blur-md border border-zinc-800 px-4 py-3 rounded-xl shadow-2xl">
        <p className="text-xs font-semibold text-zinc-400 mb-1">{label}</p>
        <p className="text-sm font-extrabold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-current inline-block" style={{ color: payload[0].color }} />
          <span>{payload[0].value} {unitLabel || "count"}</span>
        </p>
      </div>
    );
  }
  return null;
};

/**
 * AdminDashboardAnalyticsCharts
 * Renders 6-month analytics charts for new users and job postings.
 *
 * @param {{ analytics: { newUsers: Array<{ month: string, year: number, count: number }>, jobPosts: Array<{ month: string, year: number, count: number }> } }} props
 */
const AdminDashboardAnalyticsCharts = ({ analytics = {} }) => {
  const isMounted = useIsMounted();

  const newUsersData = analytics?.newUsers || [];
  const jobPostsData = analytics?.jobPosts || [];

  // Format data for charts
  const usersChartData = newUsersData.map((item) => ({
    label: `${item.month} ${item.year || ""}`.trim(),
    users: item.count || 0,
  }));

  const jobsChartData = jobPostsData.map((item) => ({
    label: `${item.month} ${item.year || ""}`.trim(),
    jobs: item.count || 0,
  }));

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 min-h-87.5 animate-pulse" />
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 min-h-87.5 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* ── New Users Registration Chart ────────────────────────────────────── */}
      <div className="bg-zinc-900/50 border border-zinc-800/70 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FiUsers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                User Signups
              </h3>
              <p className="text-xs text-zinc-500">
                New user registrations over the last 6 months
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            <FiTrendingUp className="w-3.5 h-3.5" />
            <span>Growth</span>
          </div>
        </div>

        <div className="h-70 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usersChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip unitLabel="users" />} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#userGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Job Postings Activity Chart ────────────────────────────────────── */}
      <div className="bg-zinc-900/50 border border-zinc-800/70 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <FiBriefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Job Postings
              </h3>
              <p className="text-xs text-zinc-500">
                Jobs posted over the last 6 months
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
            <FiTrendingUp className="w-3.5 h-3.5" />
            <span>Activity</span>
          </div>
        </div>

        <div className="h-70 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={jobsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="jobGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#7e22ce" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip unitLabel="jobs" />} />
              <Bar
                dataKey="jobs"
                fill="url(#jobGrad)"
                radius={[6, 6, 0, 0]}
                maxBarSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardAnalyticsCharts;
