export default function User({
  user,
  setSelectedUser,
  setActiveUser,
  activeUser,
}) {
  const userStyle =
    "p-2 py-4 rounded-lg w-[20vw] hover:cursor-pointer mx-auto px-8 my-4 hover:bg-green-800";

  return (
    <div
      className={
        activeUser === user.clientId
          ? `bg-green-800 ${userStyle}`
          : `bg-[#014885] ${userStyle}`
      }
      onClick={() => {
        setSelectedUser(user);
        setActiveUser(user.clientId);
      }}
    >
      <h1 className="text-2xl text-black">
        {user.firstName} {user.lastName}
      </h1>
      <p>
        Risk Profile: <span className="ml-4">{user.riskProfile}</span>
      </p>
      <p>
        Net Worth: <span className="ml-4">{user.aggNetWorth}</span>
      </p>

      {/*map in case of multiple user portfolios */}
      {user.portfolios.map((portfolio) => {
        return (
          <p key={portfolio.portfolioId}>
            Portfolio Name:
            <span className="ml-4">{portfolio.portfolioName}</span>
          </p>
        );
      })}

      <p>
        Restriction Status:
        <span
          className={
            user.aggRestrictionStatus === "breached"
              ? "ml-4 text-red-900"
              : "ml-4 text-white"
          }
        >
          {user.aggRestrictionStatus}
        </span>
      </p>
      <p>
        Aggregated Cap. Gain:<span className="ml-4">{user.aggCapGain}</span>
      </p>
    </div>
  );
}
