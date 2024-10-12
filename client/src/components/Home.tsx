import {NavRoutes} from "../utils/NavRoutes.ts";

export function Home() {
  return (
    <div>
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">Best place to get <br/> your <span
                className="text-blue-500 ">nails</span></h1>

              <p className="mt-3 text-gray-600 dark:text-gray-400">Book an appointment now.</p>
              <a href={NavRoutes.appointment}>
                <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase
              transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500
              focus:outline-none focus:bg-blue-500">Book Now
                </button>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img className="w-full h-full lg:max-w-2xl" src="/Manicurist-bro.svg" alt="Manicurist"/>
          </div>
        </div>
      </div>
    </div>
  );
}
