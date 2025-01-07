interface ButtonRowProps {
  setModalOpen: (arg0: boolean) => void;
  fetchData: () => void;
  setLoading: (arg0: boolean) => void;
  title: string;
}

function ButtonRow({
  title,
  setModalOpen,
  setLoading,
  fetchData,
}: ButtonRowProps) {
  return (
    <div className="flex gap-3 justify-center">
      <button
        className="btn btn-success text-white text-base"
        onClick={() => setModalOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add {title}
      </button>
      <button
        className="btn btn-primary text-white text-base"
        onClick={() => {
          setLoading(true);
          fetchData();
          setLoading(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        Refresh
      </button>
    </div>
  );
}

export default ButtonRow;
