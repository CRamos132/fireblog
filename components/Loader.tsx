interface LoaderProps {
    show?: Boolean;
}

const Loader: React.FC<LoaderProps> = ({show}) => {
    return show ? <div className="loader"></div> : null;
}

export default Loader