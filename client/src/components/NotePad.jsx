import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useRef } from 'react'

export default function NotePad({ value, onChange, ...props }) {
    const ref = useRef();


  const handleInput = (e) => {
    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
    onChange && onChange(e);
  };


    return (
        <div className='flex h-screen'>
        {/* // opened a div and used flex and justify center to center it  */}
        <div className="flex-1 w-full flex justify-center bg-black -200 px-6 py-24 sm:py-32 lg:px-8">

            {/*opened another one and used a css class to style it */}
            <div className='w-175 h-full contact bg-white p-8'>
                {/* Opened form tag */}
                <form action="#" method="POST" className="mx-auto  max-w-xl sm:mt-20">
                    {/* opened a div with one column and 2 columns for small screens */}
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        {/* each div/input column that spans 2 columns */}
                        <div className="sm:col-span-2 ">
                            {/* each div/input column that spans 2 columns */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm/6 font-semibold text-label text-Scolor">
                                Category
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    placeholder="School"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>

                        </div>
                            

                            <div className="mt-2.5 ">
                               <textarea
                                ref={ref}
                                value={value}
                                onChange={handleInput}
                                onInput={handleInput}
                                {...props}
                                className="w-full rounded border p-3 resize-none overflow-hidden"
                                style={{ minHeight: 48 }}
                                />
                            </div>
                        </div>


                        {/* each div/input column that spans 2 columns */}

                    </div>
                    <div className="mt-10">
                        {/* Added a Link tag for the buttton */}

                        <button
                            type="submit"
                            className="block w-full  bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}