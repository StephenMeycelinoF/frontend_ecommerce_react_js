export default function Title({ title, subtitle }) {
    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-row items-center gap-2">
          <div className="h-10 w-6 bg-red-600 rounded" />
          <h6 className="font-semibold text-red-600 text-base ">{title}</h6>
        </div>
        <h3 className="font-semibold text-xl lg:text-4xl">{subtitle}</h3>
      </div>
    );
  }
  