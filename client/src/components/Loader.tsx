import loader from '../assets/loader.svg'

const Loader = ({ height }: any) => (
	<div style={{ height }} className='loading'>
		<img src={loader} width="50" alt="Loading..."/>
	</div>
)

export default Loader