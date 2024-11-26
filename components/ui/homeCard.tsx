interface HomeCardProps {
  title: string;
  mainContent: any;
  icon?: any;
  info: any;
}

export default function HomeCard({
  title,
  mainContent,
  icon,
  info,
}: HomeCardProps) {
  return (
    <div className="flex flex-col bg-card h-64 p-8 rounded-2xl shadow-2xl">
      <div className="flex items-start justify-between h-[48px]">
        <p className="text-2xl font-semibold">{title}</p>
        {icon}
        </div>
      <div className="flex grow items-center text-center justify-center">
        {mainContent}
      </div>
      <div className={`flex justify-start text-left items-end text-[14px] text-gray-500 h-[48px]`}>
        {info}
      </div>
    </div>
  );
}
