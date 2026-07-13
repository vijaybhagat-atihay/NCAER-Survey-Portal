export default function SmallCard({ label, value, icon: Icon, iconBg = "bg-gray-100", iconColor = "text-gray-600", children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 h-full flex flex-col ${className}`}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs text-gray-500">{label}</h4>
          {value !== undefined && (
            <p className="text-xl font-bold text-gray-900 mt-0.5 truncate">{value}</p>
          )}
        </div>
      </div>
      {children && <div className="mt-3 flex-1">{children}</div>}
    </div>
  );
}