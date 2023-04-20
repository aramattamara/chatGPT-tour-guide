
function Dashboard(){

    const [tour, setTour] = React.useState('');
    const [city, setCity] = React.useState('');
    const [season, setSeason] = React.useState('');
    const [numDays, setNumDays] = React.useState('');
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [isCopied, setIsCopied] = React.useState(false);


    const handleCopy = () => {
        navigator.clipboard.writeText(tour); // copies the joke
        setIsCopied(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        const res = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                city,
                season,
                numDays,
            }),
        });
        setIsGenerating(false);
        if (res.status !== 200) {
            alert('Error: ' + res.statusText);
            return;
        }
        const data = await res.json();
        setTour(data['result'].trim());
        setIsCopied(false);
    };

    return(
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="flex flex-col">
                            <label className="sr-only" htmlFor="city">
                                City
                            </label>
                            <input
                                type="text"
                                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                                name="city"
                                placeholder="City"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="sr-only" htmlFor="season">
                                Season
                            </label>
                            <select
                                value={season}
                                onChange={(e) => setSeason(e.target.value)}
                                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                                name="tone"
                                id="tone"
                            >
                                <option value="default">Select Season (Optional)</option>
                                <option value="winter">Winter</option>
                                <option value="spring">Spring</option>
                                <option value="summer">Summer</option>
                                <option value="autumn">Autumn</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="days" className="sr-only">
                                Days (Optional)
                            </label>
                            <input
                                value={numDays}
                                onChange={(e) => setNumDays(e.target.value)}
                                type="number"
                                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                                placeholder="Number Of Days - Default 10 (Optional)"
                                name="days"
                                id="days"
                            />
                        </div>
                        <button
                            className={`bg-indigo-600 w-full hover:bg-indigo-700 text-white font-bold mt-7 py-2 px-4 rounded
                ${
                                isGenerating || city === ""
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                            }`}
                            type="submit"
                            disabled={isGenerating || city === ""}
                        >
                            {isGenerating ? "Please wait. Generating a tour..." : "Generate a tour"}
                        </button>
                    </form>
                </div>
                <div className="">
                    <div className="flex flex-col">
                        <label htmlFor="output" className="sr-only">
                            Output
                        </label>
                        <textarea
                            rows={
                                tour === ""
                                    ? 7
                                    : tour.split("\\n").length + 18
                            }
                            name="output"
                            onChange={(e) => setTour(e.target.value)}
                            value={tour}
                            disabled={tour === ""}
                            id="output"
                            placeholder="AI Generated Tour"
                            className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                        />
                        <button
                            onClick={handleCopy}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-0.5 rounded"
                            type="submit"
                            disabled={tour === ""}
                        >
                            {isCopied ? "Copied" : "Copy to Clipboard"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


ReactDOM.render(<Dashboard/>, document.getElementById('tour-page'));