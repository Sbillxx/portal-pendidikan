
const FormLayout = ({ children, action, notif }) => {
  return (
    <form onSubmit={action}>
      {notif == true && (
        <div className="bg-idi-200 mx-auto ring-2 ring-idi-700 p-5 w-11/12 lg:w-1/3 right-10 text-idi-700 text-small-semibold rounded-lg fixed top-10 z-50">
          Berhasil!
        </div>
      )}
      <div className="main-container flex flex-col gap-7 max-w-[700px] mx-auto">
        {children}
      </div>
    </form>
  );
};

export default FormLayout;
