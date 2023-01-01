import '../../styles/form.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';


interface CreateFormData {
    title: string;
    description: string;
};

export const Form = () => {

    const [inputTitle, setInputTitle] = useState('');
    const [inputDescription, setInputDescription] = useState('');

    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        });
        navigate('/home');
    };

    return (
        <div id='formContainer'>
            <form onSubmit={handleSubmit(onCreatePost)} id="createForm">
                <input placeholder='Title...' {...register("title")} id="formInput" onChange={e => setInputTitle(e.target.value)} />
                {errors.title?.message && !inputTitle && (
                    <div className='errorContainer1'><p className='errorMsg'>{errors.title?.message}</p></div>
                )}
                <textarea placeholder='Description...' {...register("description")} id="formTextArea" onChange={e => setInputDescription(e.target.value)} />
                {errors.description?.message && !inputDescription && (
                    <div className='errorContainer2'><p className='errorMsg'>{errors.description?.message}</p></div>
                )}
                <input type="submit" id={(inputTitle && inputDescription) ? 'formSubmitBtn' : 'notFormSumitBtn'} />
            </form>
        </div>
    );
}