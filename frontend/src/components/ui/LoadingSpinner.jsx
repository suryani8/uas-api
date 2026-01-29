export default function LoadingSpinner({ size = 'default', text = 'Memuat...' }) {
  const sizeClasses = {
    small: 'h-8 w-8 border-2',
    default: 'h-12 w-12 border-3',
    large: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex flex-col justify-center items-center py-16 gap-4">
      <div className="relative">
        <div className={`animate-spin rounded-full border-orange-500/30 border-t-orange-500 ${sizeClasses[size]}`} />
      </div>
      <p className="text-gray-400 font-medium">{text}</p>
    </div>
  );
}
