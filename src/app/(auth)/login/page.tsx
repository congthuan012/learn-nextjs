'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface Credentials {
      username: string;
      password: string;
}
interface ValidationError {
      username: string;
      password: string;
      api: string;
}

export default function Page() {
      const [credentials, setCredentials] = useState<Credentials>({
            username: '',
            password: ''
      });
      const [validateError, setValidateError] = useState<ValidationError>({
            username: '',
            password: '',
            api: '',
      })
      const router = useRouter();
      const MySwal = withReactContent(Swal)


      const handleChange = (e: any) => {
            setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

      const handleSubmit = async (e: any) => {
            if (handleValidate()) {
                  await signIn("credentials", {
                        username: credentials.username,
                        password: credentials.password,
                        redirect: false,
                        callbackUrl: '/admin/cars'
                  }).then(res => {
                        MySwal.fire({
                              position: 'center',
                              icon: 'success',
                              title: 'Sign In Success',
                              showConfirmButton: false,
                              timer: 1500
                        }).then(() => {
                              router.push('/admin/cars')
                        })
                  }).catch(err => {
                        const error = {
                              username: '',
                              password: '',
                              api: 'Credential is not match',
                        }
                        setValidateError(error);
                  });
            }
      }

      const handleValidate = () => {
            const errors: any = {};
            let isValid = true;

            for (const key of Object.keys(credentials)) {
                  if (!credentials[key as keyof Credentials]) {
                        isValid = false;
                        errors[key] = `${key} is required`;
                  }
            }

            if (!isValid) {
                  setValidateError(errors);
            }

            return isValid;
      }


      return (
            <div className="container">
                  <h1 className="text-center">Login form</h1>
                  <p className='error-message'>{validateError['api']}</p>
                  <div className="mb-3">
                        <label htmlFor="exampleInputUsername" className="form-label">username</label>
                        <input type="text" className="form-control" name='username' onChange={handleChange} id="exampleInputUsername" />
                        <p className='error-message'>{validateError['username']}</p>
                  </div>
                  <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' onChange={handleChange} id="exampleInputPassword1" />
                        <p className='error-message'>{validateError['username']}</p>
                  </div>
                  <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                  <Link className='btn btn-secondary' href="/">Cancel</Link>
            </div>
      )
}