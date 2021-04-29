import Image from 'next/image'
import Link from 'next/link'


function IndexPage({ allData, moreData }) {
	console.log(allData);
	console.log(moreData);

	return (
    <>

        


        <h1 className="uk-text-center">List Pokemon</h1>

		<div className=" uk-child-width-1-4@m uk-text-center uk-grid" uk-grid="true">
						{/* Looping untuk menampilkan data pokemon */}
						{allData.map(({ id, name, sprites, types }) => (
			<div key={name}>

                <div className="uk-card uk-card-default">
                        <div className="uk-card-media-top">
                            <Link href={"/detail/" + id}>
                            <a><img src={sprites.front_default} width="100%" /> </a>
                            </Link>
                        </div>

			<Link href={"/detail/" + id}>
            <div className="uk-card-body">
			<a><p className="uk-text-left uk-card-title uk-text-capitalize">{types[0].type.name}</p></a>
                <h4 className="uk-text-left uk-text-capitalize"> {name} </h4>
				<p className="uk-text-left uk-text-capitalize">{moreData[id - 1].flavor_text_entries[0].flavor_text}</p>
            </div>
			
			</Link>
        </div>
							
	</div>
	))}
	</div>

{/* bawah jgn hapuss */}
    </>
	);
}

export async function getStaticProps() {
	// cari data pokemon

	// set limitnya brapa
	const limit = 8;
	// fetch pokemon API
	const res  = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
	// ubah data ke format json
	const data = await res.json();
	const allData  = [];
	const moreData = [];

	// masukkan data ke array yang baru
	let count  = 0;
	let count2 = 0;
	for (const item of data.results) {
		const pokeUrl  = await fetch(item.url);
		const pokeData = await pokeUrl.json();

		const speciesUrl   = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeData.name}`)
		const speciesData  = await speciesUrl.json();
		allData[count++]   = pokeData;
		moreData[count2++] = speciesData;
	}
  
	// pass data ke IndexPage
	return {
		props: {
			allData,
			moreData
		},
	}
}

export default IndexPage