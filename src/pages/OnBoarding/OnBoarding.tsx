import React, { useReducer } from 'react';
import styles from "./OnBoarding.module.scss";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { onBoarding } from "../../services/general-http.service";

const formReducer = (state: any, event: any) => {
    return {
      ...state,
      [event.target.name]: event.target.value
    }
   }

function OnBoarding() {
    
    const [formData, setFormData] = useReducer(formReducer, {});

    const submitOnBoarding = async (formData: any) => {
        const body = {
            email: formData.email,
            subdomain: formData.subdomain,
            lob: formData.lob
        };
        await onBoarding(JSON.stringify(body));
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await submitOnBoarding(formData);
    }
  
    return (
            <div className={styles.OnBoarding}>
                {
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <div>
                        <FormControl>
                            <InputLabel htmlFor="email-input">Email address</InputLabel>
                            <Input id="email-input" className={styles.formInputField} name="email" onChange={setFormData} />
                        </FormControl> 
                        </div>
                         <div>
                         <FormControl>
                            <InputLabel htmlFor="lob-input">LOB</InputLabel>
                            <Input id="lob-input" className={styles.formInputField} name="lob" onChange={setFormData} />
                        </FormControl>
                         </div>
                     <div>
                     <FormControl>
                            <InputLabel htmlFor="subdomain-input">Subdomain</InputLabel>
                            <Input id="subdomain-input" className={styles.formInputField} name="subdomain" onChange={setFormData} />
                        </FormControl>  
                     </div>
                    <div>
                        <button type="submit" className={styles.submitButton}>On Boarding</button>
                    </div>
                    </form>
                }
            </div>
        
    );
}

export default OnBoarding;
