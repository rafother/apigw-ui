import React, { useCallback } from 'react';
import styled from 'styled-components';
import {useDropzone} from 'react-dropzone';
import styles from "./Kubeconfig.module.scss";
import {Avatar, Typography} from "@material-ui/core";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#4454af',
    borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    color: '#4454af',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const getColor = (props: any) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#4454af';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #ffffff;
  color: #4454af;
  outline: none;
  transition: border .24s ease-in-out;
`;

type Props = {
    onAcceptedKubeconfig: (acceptedFile: any) => void;
};

function Kubeconfig(props: Props) {
    const onDrop = useCallback(acceptedFile => {
        props.onAcceptedKubeconfig(acceptedFile);
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({accept: 'application/x-yaml', multiple: false, onDrop});

    return (
        <div>
        <div className={styles.Kubeconfig}>
            <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
                <Typography variant="h5">
                    Connect To Cluster
                </Typography>
                <input {...getInputProps()} />
                <img  src="/static/images/kubeimg.png"/>
                <Typography variant="h6">To get started, <b>drag and drop your Kubeconfig</b> file, or <b>click to select file</b></Typography>
            </Container>
        </div>
        </div>
    );
}

export default Kubeconfig;
