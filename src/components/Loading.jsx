function Loading({
  text = "Loading...",
}) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

      <p className="text-sm font-medium text-text/60">
        {text}
      </p>
    </div>
  );
}

export default Loading;