
const isLatitude = (lat: number) => {
    return isFinite(lat) && Math.abs(lat) <= 90;
}

const isLongitude = (lng: number) => {
    return isFinite(lng) && Math.abs(lng) <= 180;
}

const LatViewer = (
    props: {
        value: any
    }) => {
    const { value } = props;
    let temp = isLatitude(value);
    return (
        <div style={{ width: '100%', border: temp ? "" : "1px solid red" }}>
            {
                value
            }
        </div>
    )
}

const LongViewer = (
    props: {
        value: any
    }) => {
    const { value } = props;
    let temp = isLongitude(value);
    return (
        <div style={{ width: '100%', border: temp ? "" : "1px solid red" }}>
            {
                value
            }
        </div>
    )
}

export {
    LatViewer, 
    LongViewer
}