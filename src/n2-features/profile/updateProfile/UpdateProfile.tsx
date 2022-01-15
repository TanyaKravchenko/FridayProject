import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import s from './UpdateProfile.module.scss';
import {writeFile} from "./getFile";
import {useDispatch} from "react-redux";
import {setValueSearchAC} from "../../../n1-main/m2-bll/reducers/packs-reducer";
//types
type UpdateProfilePropsType = {
    width: number
    height: number
    closeModal: () => void
    updateUserName: (value: string, avatar:string) => void
    name: string
    setName:(value:string)=>void
    avatar?:string
    setAvatar:(value:string)=>void

}
export const UpdateProfile = (props: UpdateProfilePropsType) => {
    const {
        width,
        height,
        closeModal,
        updateUserName,
        name,
        setName,
        avatar,
        setAvatar
    } = props

    //hooks
    const inRef = useRef<HTMLInputElement>(null);
    const [code, setCode] = useState(true);
    const [base64, setBase64] = useState(true); // base64 - true, text - false
    const [text, setText] = useState('');
    const [file, setFile] = useState<any>();
    const [fileURL, setFileURL] = useState<any>();
    const [file64, setFile64] = useState<any>();
    const [fileData, setFileData] = useState<any>();
    const [title, setTitle] = useState(name)

    //place the block in the middle
    const top = `calc(50vh - ${height / 2}px)`;
    const left = `calc(50vw - ${width / 2}px)`;

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        // e.preventDefault();
        const reader = new FileReader();
        const formData = new FormData(); // for send to back

        const newFile = e.target.files && e.target.files[0];  //достаем из таргета файлы, если файлы есть - прилетает массив, откуда достаем 0


        if (newFile) {
            setFile(newFile);
            setFileURL(window.URL.createObjectURL(newFile));  //спецовая функция Window, так мы можем отобразить newFile в img, эта функция генерит спец ссылку, которая видна только внутри этого проекта
            formData.append('myFile', newFile, newFile.name);
            setFileData(formData);

            if (code) { // reader
                reader.onloadend = () => {
                    setFile64(reader.result);
                };

                if (base64) reader.readAsDataURL(newFile);
                else reader.readAsText(newFile);
            }
        }
    };

    //handlers
    const onChangeSetInputValue = (e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const returnFileSize = (n: number) => {
        if (n < 1024) {
            return n + 'bytes';
        } else if (n > 1024 && n < 1048576) {
            return (n / 1024).toFixed(2) + 'KB';
        } else if (n > 1048576) {
            return (n / 1048576).toFixed(2) + 'MB';
        }
    };
    const updateProfileHandler = () => {
        updateUserName(title, file64)
        setName(title)
        setAvatar(file64)

    };
    const modalMessageStyle = {
        top,
        left,
        width: width,
        height: height
    }
    return (
        <div>
            <div className={s.modalBackground}>
            </div>
            <div className={s.modalMessage} style={modalMessageStyle}>
                <h3>
                    <span>Add new title</span>
                    <input onChange={onChangeSetInputValue} value={title}/>
                </h3>
                <label>
                    reader
                    <input type={'checkbox'} checked={code} onChange={e => setCode(e.currentTarget.checked)}/>
                </label>
                <label>
                    base64
                    <input type={'checkbox'} checked={base64} onChange={e => setBase64(e.currentTarget.checked)}/>
                </label>
                <div>
                    <img src={file64} alt={'file'} width={'300px'}/>
                    <div>name: {file && file.name}</div>
                    <div>lastModified: {file && file.lastModified}</div>
                    <div>size: {file && returnFileSize(file.size)}</div>
                    <div>type: {file && file.type}</div>
                </div>
                <input
                    ref={inRef}
                    type={'file'}
                    style={{display: 'none'}}
                    onChange={upload}
                />
                {/*<pre>{file64}</pre>*/}
                <button onClick={() => inRef && inRef.current && inRef.current.click()}>add</button>
                <div>
                    <button onClick={() => writeFile('Text.txt', text + `\r\n` + file64)}>save</button>
                    <button onClick={updateProfileHandler}>send</button>
                </div>

                <button className={s.cancelBtn} onClick={closeModal}>x</button>
            </div>
        </div>

    )
}