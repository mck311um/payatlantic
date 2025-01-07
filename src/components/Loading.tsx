interface LoadingProps {
  loading: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
  return (
    <>
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center z-10">
          <span className="loading loading-spinner text-neutral-900 loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default Loading;
