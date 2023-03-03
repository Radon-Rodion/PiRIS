

const ContractInfo = ({ info }) => {
    return (
        <div className='col'>
            <p className='text row'>Фамилия: <span>{info.surname}</span></p>
        </div>
    );
}

export default ContractInfo;