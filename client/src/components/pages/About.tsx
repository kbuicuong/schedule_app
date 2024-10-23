
export function About() {
  return (
    <section className="bg-white mt-2.5">
      <div className="px-6 py-10">
        <div className="xl:flex xl:items-center xL:-mx-4">
          <div className="xl:w-1/2 xl:mx-4">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">About me</h1>

            <p className="max-w-2xl mt-4 text-gray-500">
              Hi! I’m Tony, a dedicated nail technician with a passion for creating stunning, personalized designs.
              With over 20 years of experience, I focus on quality and detail to ensure you leave feeling fabulous.
              Let’s transform your nails into a beautiful reflection of your style!
            </p>
          </div>

          <div className=" gap-8 mt-8 xl:mt-0 xl:mx-4 xl:w-1/2 md:grid-cols-2">
            <div>
              <img className="object-cover rounded-xl aspect-square"
                   src="/tony-family.jpg"
                   alt=""/>

              {/*<h1 className="mt-4 text-2xl font-semibold text-gray-700 text-center">Tony Bui</h1>*/}

              {/*<p className="mt-2 text-gray-500 text-center">Nail Technician</p>*/}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
