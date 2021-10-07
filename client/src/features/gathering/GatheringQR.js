import QRCode from "react-qr-code";

const GatheringQR = ({ gatheringId }) => {
  const gatheringURL = `${window.location.origin}/${gatheringId}`

  return ( 
    <QRCode value={gatheringURL} className='m-3'/>
  )
}

export default GatheringQR