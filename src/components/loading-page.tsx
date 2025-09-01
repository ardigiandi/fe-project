

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-5">
      <div className="w-10 h-10 rounded-full animate-spin border-l-3 border-r-3 border-t-0 border-b-0 border-muted-foreground border-t-transparent border-b-transparent"></div>
      <div className="text-center space-y-1">
        <p className="text-xl font-bold animate-pulse">Please wait</p>
        <p className="text-muted-foreground animate-pulse">We're prepering your content</p>
      </div>
    </div>
  );
};

export default LoadingPage;
