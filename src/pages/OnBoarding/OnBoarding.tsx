import React, { useReducer } from 'react';
import styles from "./OnBoarding.module.scss";
import { Button, TextField } from '@material-ui/core';
import { onBoarding } from "../../services/general-http.service";
import _ from "lodash";

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
        event.preventDefault(); // prevents refreshing the page
        await submitOnBoarding(formData);
    }

    const isDisabled = () => {
        return !(!_.isEmpty(formData.email) && !_.isEmpty(formData.subdomain) && !_.isEmpty(formData.lob));
    }
  
    return (
            <div className={styles.OnBoarding}>
                {
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <TextField id="email-input" fullWidth className={styles.formInputField} label="Email address" name="email" required={true} onChange={setFormData} />
                        <TextField id="lob-input" fullWidth  className={styles.formInputField} name="lob" label="LOB" required={true} onChange={setFormData} />
                        <TextField id="subdomain-input" fullWidth  className={styles.formInputField} name="subdomain" label="Subdomain" required={true} onChange={setFormData} />
                        <Button variant="contained" type="submit" className={styles.submitButton} disabled={isDisabled()}>On Boarding</Button>
                    </form>
                }
            </div>
        
    );
}

export default OnBoarding;
