import { useEffect, useMemo, useRef, useState } from "react";

type LocationValue = {
    country: string;
    state: string;
    city: string;
};

type LocationSelectorProps = {
    country: string;
    state: string;
    city: string;
    onChange: (location: LocationValue) => void;
    required?: boolean;
};

type Option = {
    name: string;
    code?: string;
};

/*
|--------------------------------------------------------------------------
| Countries
|--------------------------------------------------------------------------
| The selector supports countries beyond Nigeria.
| Nigeria is placed first because HealthOpz is initially Nigeria-focused.
|--------------------------------------------------------------------------
*/

const COUNTRIES: Option[] = [
    { name: "Nigeria", code: "NG" },
    { name: "Ghana", code: "GH" },
    { name: "Kenya", code: "KE" },
    { name: "South Africa", code: "ZA" },
    { name: "United States", code: "US" },
    { name: "United Kingdom", code: "GB" },
    { name: "Canada", code: "CA" },
    { name: "Australia", code: "AU" },
    { name: "Germany", code: "DE" },
    { name: "France", code: "FR" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "India", code: "IN" },
    { name: "Ireland", code: "IE" },
    { name: "Netherlands", code: "NL" },
    { name: "Spain", code: "ES" },
    { name: "Italy", code: "IT" },
    { name: "Brazil", code: "BR" },
    { name: "New Zealand", code: "NZ" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Qatar", code: "QA" },
];

/*
|--------------------------------------------------------------------------
| Nigerian States
|--------------------------------------------------------------------------
*/

const NIGERIAN_STATES: Option[] = [
    { name: "Abia", code: "AB" },
    { name: "Adamawa", code: "AD" },
    { name: "Akwa Ibom", code: "AK" },
    { name: "Anambra", code: "AN" },
    { name: "Bauchi", code: "BA" },
    { name: "Bayelsa", code: "BY" },
    { name: "Benue", code: "BE" },
    { name: "Borno", code: "BO" },
    { name: "Cross River", code: "CR" },
    { name: "Delta", code: "DE" },
    { name: "Ebonyi", code: "EB" },
    { name: "Edo", code: "ED" },
    { name: "Ekiti", code: "EK" },
    { name: "Enugu", code: "EN" },
    { name: "Gombe", code: "GO" },
    { name: "Imo", code: "IM" },
    { name: "Jigawa", code: "JI" },
    { name: "Kaduna", code: "KD" },
    { name: "Kano", code: "KN" },
    { name: "Katsina", code: "KT" },
    { name: "Kebbi", code: "KE" },
    { name: "Kogi", code: "KO" },
    { name: "Kwara", code: "KW" },
    { name: "Lagos", code: "LA" },
    { name: "Nasarawa", code: "NA" },
    { name: "Niger", code: "NI" },
    { name: "Ogun", code: "OG" },
    { name: "Ondo", code: "ON" },
    { name: "Osun", code: "OS" },
    { name: "Oyo", code: "OY" },
    { name: "Plateau", code: "PL" },
    { name: "Rivers", code: "RI" },
    { name: "Sokoto", code: "SO" },
    { name: "Taraba", code: "TA" },
    { name: "Yobe", code: "YO" },
    { name: "Zamfara", code: "ZA" },
    { name: "Federal Capital Territory", code: "FC" },
];

/*
|--------------------------------------------------------------------------
| Nigerian Local Governments / Major Locations
|--------------------------------------------------------------------------
|
| This is intentionally broader than a simple city list.
| It contains major cities, towns and LGAs so users have a practical
| selection when registering a healthcare facility or professional.
|
*/

const NIGERIAN_LOCATIONS: Record<string, string[]> = {
    Abia: [
        "Aba",
        "Aba North",
        "Aba South",
        "Arochukwu",
        "Bende",
        "Ikwuano",
        "Isiala Ngwa North",
        "Isiala Ngwa South",
        "Isuikwuato",
        "Obi Ngwa",
        "Ohafia",
        "Osisioma Ngwa",
        "Ugwunagbo",
        "Ukwa East",
        "Ukwa West",
        "Umuahia",
        "Umuahia North",
        "Umuahia South",
        "Umunneochi",
    ],

    Adamawa: [
        "Yola",
        "Yola North",
        "Yola South",
        "Fufore",
        "Ganye",
        "Girei",
        "Gombi",
        "Guyuk",
        "Hong",
        "Jada",
        "Madagali",
        "Maiha",
        "Mayo-Belwa",
        "Michika",
        "Mubi North",
        "Mubi South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
    ],

    "Akwa Ibom": [
        "Uyo",
        "Abak",
        "Eastern Obolo",
        "Eket",
        "Esit Eket",
        "Essien Udim",
        "Etim Ekpo",
        "Etinan",
        "Ibeno",
        "Ibiono Ibom",
        "Ika",
        "Ikono",
        "Ikot Abasi",
        "Ikot Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat-Enin",
        "Nsit Atai",
        "Nsit Ibom",
        "Nsit Ubium",
        "Obot Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung Uko",
        "Ukanafun",
        "Uruan",
        "Urue-Offong/Oruko",
        "Ibesikpo Asutan",
    ],

    Anambra: [
        "Awka",
        "Awka North",
        "Awka South",
        "Aguata",
        "Anambra East",
        "Anambra West",
        "Anaocha",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili North",
        "Idemili South",
        "Ihiala",
        "Njikoka",
        "Nnewi North",
        "Nnewi South",
        "Ogbaru",
        "Onitsha North",
        "Onitsha South",
        "Orumba North",
        "Orumba South",
        "Oyi",
        "Ogbunike",
        "Ekwulobia",
        "Nnewi",
    ],

    Bauchi: [
        "Bauchi",
        "Alkaleri",
        "Bauchi",
        "Bogoro",
        "Damban",
        "Darazo",
        "Dass",
        "Gamawa",
        "Ganjuwa",
        "Giade",
        "Itas/Gadau",
        "Jama'are",
        "Katagum",
        "Kirfi",
        "Misau",
        "Ningi",
        "Shira",
        "Tafawa Balewa",
        "Toro",
        "Warji",
        "Zaki",
    ],

    Bayelsa: [
        "Yenagoa",
        "Brass",
        "Ekeremor",
        "Kolokuma/Opokuma",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Southern Ijaw",
        "Yenagoa",
        "Kaiama",
    ],

    Benue: [
        "Makurdi",
        "Ado",
        "Agatu",
        "Apa",
        "Buruku",
        "Gbajimba",
        "Guma",
        "Gwer East",
        "Gwer West",
        "Katsina-Ala",
        "Konshisha",
        "Kwande",
        "Logo",
        "Otukpo",
        "Ogbadibo",
        "Ohimini",
        "Oju",
        "Okpokwu",
        "Oturkpo",
        "Tarka",
        "Ukum",
        "Ushongo",
        "Vandeikya",
    ],

    Borno: [
        "Maiduguri",
        "Askira/Uba",
        "Bama",
        "Bayo",
        "Biu",
        "Chibok",
        "Damboa",
        "Dikwa",
        "Gubio",
        "Guzamala",
        "Gwoza",
        "Hawul",
        "Jere",
        "Kaga",
        "Kala/Balge",
        "Konduga",
        "Kukawa",
        "Kwaya Kusar",
        "Mafa",
        "Magumeri",
        "Marte",
        "Mobbar",
        "Monguno",
        "Ngala",
        "Nganzai",
        "Shani",
    ],

    "Cross River": [
        "Calabar",
        "Calabar Municipal",
        "Calabar South",
        "Abi",
        "Akamkpa",
        "Akpabuyo",
        "Bakassi",
        "Bekwarra",
        "Biase",
        "Boki",
        "Etung",
        "Ikom",
        "Obanliku",
        "Obubra",
        "Obudu",
        "Ogoja",
        "Yakuur",
        "Yakurr",
    ],

    Delta: [
        "Asaba",
        "Bomadi",
        "Burutu",
        "Ethiope East",
        "Ethiope West",
        "Ika North East",
        "Ika South",
        "Isoko North",
        "Isoko South",
        "Ndokwa East",
        "Ndokwa West",
        "Okpe",
        "Oshimili North",
        "Oshimili South",
        "Sapele",
        "Udu",
        "Ughelli North",
        "Ughelli South",
        "Ukwuani",
        "Uvwie",
        "Warri North",
        "Warri South",
        "Warri South West",
        "Warri",
        "Effurun",
        "Oghara",
        "Agbor",
        "Ozoro",
        "Orhuwhorun",
        "Ekpan",
        "Enerhen",
        "Otor-Udu",
    ],

    Ebonyi: [
        "Abakaliki",
        "Afikpo North",
        "Afikpo South",
        "Ebonyi",
        "Ezza North",
        "Ezza South",
        "Ikwo",
        "Ishielu",
        "Ivo",
        "Izzi",
        "Ohaukwu",
        "Onicha",
    ],

    Edo: [
        "Benin City",
        "Akoko-Edo",
        "Egor",
        "Esan Central",
        "Esan North-East",
        "Esan South-East",
        "Esan West",
        "Etsako Central",
        "Etsako East",
        "Etsako West",
        "Igueben",
        "Ikpoba-Okha",
        "Oredo",
        "Orhionmwon",
        "Ovia North-East",
        "Ovia South-West",
        "Owan East",
        "Owan West",
        "Uhunmwonde",
    ],

    Ekiti: [
        "Ado-Ekiti",
        "Aiyekire",
        "Efon",
        "Ekiti East",
        "Ekiti South-West",
        "Ekiti West",
        "Emure",
        "Gbonyin",
        "Ido-Osi",
        "Ijero",
        "Ikere",
        "Ikole",
        "Ilejemeje",
        "Irepodun/Ifelodun",
        "Ise/Orun",
        "Moba",
        "Oye",
    ],

    Enugu: [
        "Enugu",
        "Enugu East",
        "Enugu North",
        "Enugu South",
        "Aninri",
        "Awgu",
        "Enugu Ezike",
        "Ezeagu",
        "Igbo-Etiti",
        "Igbo-Eze North",
        "Igbo-Eze South",
        "Isi-Uzo",
        "Nkanu East",
        "Nkanu West",
        "Nsukka",
        "Oji River",
        "Udenu",
        "Udi",
        "Uzo-Uwani",
    ],

    Lagos: [
        "Ikeja",
        "Alimosho",
        "Agege",
        "Ajeromi-Ifelodun",
        "Apapa",
        "Badagry",
        "Epe",
        "Eti-Osa",
        "Ifako-Ijaiye",
        "Ikorodu",
        "Kosofe",
        "Lagos Island",
        "Lagos Mainland",
        "Mushin",
        "Ojo",
        "Oshodi-Isolo",
        "Shomolu",
        "Surulere",
        "Lekki",
        "Victoria Island",
    ],

    Ogun: [
        "Abeokuta",
        "Abeokuta North",
        "Abeokuta South",
        "Ado-Odo/Ota",
        "Ewekoro",
        "Ifo",
        "Ijebu East",
        "Ijebu North",
        "Ijebu North East",
        "Ijebu Ode",
        "Ikenne",
        "Imeko Afon",
        "Ipokia",
        "Obafemi Owode",
        "Odeda",
        "Odogbolu",
        "Remo North",
        "Sagamu",
        "Yewa North",
        "Yewa South",
    ],

    Ondo: [
        "Akure",
        "Akure North",
        "Akure South",
        "Akoko North-East",
        "Akoko North-West",
        "Akoko South-East",
        "Akoko South-West",
        "Ese Odo",
        "Idanre",
        "Ifedore",
        "Ilaje",
        "Ile Oluji/Okeigbo",
        "Irele",
        "Odigbo",
        "Okitipupa",
        "Ondo East",
        "Ondo West",
        "Ose",
        "Owo",
    ],

    Osun: [
        "Osogbo",
        "Atakunmosa East",
        "Atakunmosa West",
        "Ayedaade",
        "Ayedire",
        "Boluwaduro",
        "Boripe",
        "Ede North",
        "Ede South",
        "Egbedore",
        "Ejigbo",
        "Ife Central",
        "Ife East",
        "Ife North",
        "Ife South",
        "Ifedayo",
        "Ila",
        "Ilesa East",
        "Ilesa West",
        "Irepodun",
        "Irewole",
        "Isokan",
        "Iwo",
        "Obokun",
        "Odo Otin",
        "Ola Oluwa",
        "Olorunda",
        "Oriade",
        "Orolu",
    ],

    Oyo: [
        "Ibadan",
        "Ibadan North",
        "Ibadan North-East",
        "Ibadan North-West",
        "Ibadan South-East",
        "Ibadan South-West",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibarapa Central",
        "Ibarapa East",
        "Ibarapa North",
        "Ido",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu",
        "Ogbomosho North",
        "Ogbomosho South",
        "Ogo Oluwa",
        "Olorunsogo",
        "Oluyole",
        "Ona Ara",
        "Orelope",
        "Oriire",
        "Oyo East",
        "Oyo West",
        "Saki East",
        "Saki West",
        "Surulere",
    ],

    Rivers: [
        "Port Harcourt",
        "Abua/Odual",
        "Ahoada East",
        "Ahoada West",
        "Akuku-Toru",
        "Andoni",
        "Asari-Toru",
        "Bonny",
        "Degema",
        "Eleme",
        "Emohua",
        "Etche",
        "Gokana",
        "Ikwerre",
        "Khana",
        "Obio/Akpor",
        "Ogba/Egbema/Ndoni",
        "Ogu/Bolo",
        "Okrika",
        "Omuma",
        "Opobo/Nkoro",
        "Oyigbo",
        "Tai",
    ],

    Kaduna: [
        "Kaduna",
        "Birnin Gwari",
        "Chikun",
        "Giwa",
        "Igabi",
        "Ikara",
        "Jaba",
        "Jema'a",
        "Kachia",
        "Kaduna North",
        "Kaduna South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon Gari",
        "Sanga",
        "Soba",
        "Zangon Kataf",
        "Zaria",
    ],

    Kano: [
        "Kano Municipal",
        "Dala",
        "Fagge",
        "Gwale",
        "Kano Municipal",
        "Kumbotso",
        "Nasarawa",
        "Tarauni",
        "Ungogo",
        "Warawa",
        "Wudil",
        "Dawakin Kudu",
        "Dawakin Tofa",
        "Gaya",
        "Gezawa",
        "Kura",
        "Madobi",
        "Minjibir",
        "Rano",
        "Tofa",
    ],

    "Federal Capital Territory": [
        "Abuja",
        "Abuja Municipal Area Council",
        "Bwari",
        "Gwagwalada",
        "Kuje",
        "Kwali",
        "Gwarinpa",
        "Maitama",
        "Asokoro",
        "Wuse",
        "Garki",
    ],
};

/*
|--------------------------------------------------------------------------
| Fallback locations
|--------------------------------------------------------------------------
|
| For Nigerian states where we haven't yet populated the detailed list,
| the state itself remains selectable as a location.
|
*/

function getLocationsForCountry(
    country: string,
    state: string
): string[] {
    if (country === "Nigeria") {
        return NIGERIAN_LOCATIONS[state] ?? (state ? [state] : []);
    }

    /*
     * International locations can later be connected to a proper
     * geographic API/database. For now, allow the user to select
     * a country and enter/select a general state/province.
     */
    return state ? [state] : [];
}

/*
|--------------------------------------------------------------------------
| Searchable Select
|--------------------------------------------------------------------------
*/

function SearchableSelect({
    label,
    value,
    options,
    placeholder,
    disabled,
    required,
    onChange,
}: {
    label: string;
    value: string;
    options: string[];
    placeholder: string;
    disabled?: boolean;
    required?: boolean;
    onChange: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const filteredOptions = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return options;
        }

        return options.filter((option) =>
            option.toLowerCase().includes(query)
        );
    }, [options, search]);

    function selectOption(option: string) {
        onChange(option);
        setSearch("");
        setOpen(false);
    }

    return (
        <div
            ref={wrapperRef}
            className="relative"
        >
            <label className="mb-2 block text-sm font-semibold text-gray-700">
                {label}
            </label>

            <button
                type="button"
                disabled={disabled}
                onClick={() => {
                    setOpen((current) => !current);
                    setSearch("");
                }}
                className={[
                    "flex w-full items-center justify-between rounded-xl border",
                    "border-gray-200 bg-gray-50 px-4 py-4 text-left",
                    "text-gray-900 outline-none transition",
                    "focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100",
                    disabled
                        ? "cursor-not-allowed opacity-50"
                        : "hover:border-gray-300",
                ].join(" ")}
            >
                <span className={value ? "text-gray-900" : "text-gray-400"}>
                    {value || placeholder}
                </span>

                <span
                    className={[
                        "text-gray-400 transition-transform",
                        open ? "rotate-180" : "",
                    ].join(" ")}
                >
                    ▼
                </span>
            </button>

            {required && (
                <input
                    tabIndex={-1}
                    required
                    value={value}
                    onChange={() => undefined}
                    className="pointer-events-none absolute h-0 w-0 opacity-0"
                    aria-hidden="true"
                />
            )}

            {open && !disabled && (
                <div className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                    <div className="border-b border-gray-100 p-3">
                        <input
                            autoFocus
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder={`Search ${label.toLowerCase()}...`}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                        />
                    </div>

                    <div className="max-h-64 overflow-y-auto p-2">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => selectOption(option)}
                                    className={[
                                        "w-full rounded-xl px-4 py-3 text-left text-sm",
                                        "transition hover:bg-teal-50 hover:text-teal-700",
                                        value === option
                                            ? "bg-teal-50 font-semibold text-teal-700"
                                            : "text-gray-700",
                                    ].join(" ")}
                                >
                                    {option}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center text-sm text-gray-500">
                                No {label.toLowerCase()} found.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| LocationSelector
|--------------------------------------------------------------------------
*/

export default function LocationSelector({
    country,
    state,
    city,
    onChange,
    required = false,
}: LocationSelectorProps) {
    const stateOptions = useMemo(() => {
        if (country === "Nigeria") {
            return NIGERIAN_STATES.map((item) => item.name);
        }

        return [];
    }, [country]);

    const cityOptions = useMemo(() => {
        return getLocationsForCountry(country, state);
    }, [country, state]);

    function updateCountry(value: string) {
        onChange({
            country: value,
            state: "",
            city: "",
        });
    }

    function updateState(value: string) {
        onChange({
            country,
            state: value,
            city: "",
        });
    }

    function updateCity(value: string) {
        onChange({
            country,
            state,
            city: value,
        });
    }

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <SearchableSelect
                label="Country"
                value={country}
                options={COUNTRIES.map((item) => item.name)}
                placeholder="Select country"
                required={required}
                onChange={updateCountry}
            />

            <SearchableSelect
                label={
                    country === "Nigeria"
                        ? "State"
                        : "State / Province"
                }
                value={state}
                options={stateOptions}
                placeholder={
                    country === "Nigeria"
                        ? "Select state"
                        : "Select state / province"
                }
                disabled={!country || country !== "Nigeria"}
                required={required}
                onChange={updateState}
            />

            <SearchableSelect
                label={
                    country === "Nigeria"
                        ? "City / LGA"
                        : "City"
                }
                value={city}
                options={cityOptions}
                placeholder={
                    !state
                        ? "Select state first"
                        : "Search city / LGA"
                }
                disabled={!state}
                required={required}
                onChange={updateCity}
            />
        </div>
    );
}