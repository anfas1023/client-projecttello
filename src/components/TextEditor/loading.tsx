import styles from "./Loading.module.css";

export function Loading() {
  return (
    <div className={styles.loading}>
        <div className=" h-screen bg-workspace-gray flex justify-center items-center">
          {/* <p className="text-white">Loading.</p> */}
          <div
            className="inline-block text-red-700 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
    </div>
  );
}