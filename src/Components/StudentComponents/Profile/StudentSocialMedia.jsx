import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { backendurl } from '../../../../constants/backendurl';



const StudentSocialMedia = () => {
    // document.querySelector("title").innerText = ``
    const formik = useFormik({
        initialValues: {
            twitterlink: '',
            facebooklink: '',
            whatsapplink: '',
            otherlink: ''
        },
        onSubmit: (values) => {
            updateDetails(values)
        }
    })
    const updateDetails = async ({ twitterlink, facebooklink, whatsapplink, otherlink }) => {
        let details = {
            'links.twitterlink': twitterlink,
            'links.facebooklink': facebooklink,
            'links.whatsapplink': whatsapplink,
            'links.otherlink': otherlink,
        }
        let endpoint = `${backendurl}student/updateinfo`
        try {
            const upload = await axios.post(endpoint, { details, token: localStorage.token })
            console.log(upload);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form className="w-full max-w-screen-md mx-auto" onSubmit={formik.handleSubmit}>
                <h3 className="p-3 text-2xl font-bold">Add Your Social Media Links</h3>
                <div className="w-full ">
                    <div className="mb-4">
                        <label htmlFor="twitterlink" className="block font-semibold">Twitter Address</label>
                        <input
                            name="setting"
                            type="link"
                            {...formik.getFieldProps('twitterlink')}
                            className="h-12 border-2 rounded-md p-2 w-3/4 md:w-1/2"
                            placeholder="Twitter Address"
                            id="twitterlink"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="facebooklink" className="block font-semibold">Facebook Link</label>
                        <input
                            type="link"
                            {...formik.getFieldProps('facebooklink')}
                            className="h-12 border-2 rounded-md p-2 w-3/4 md:w-1/2"
                            placeholder="Facebook Link"
                            id="facebooklink"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="whatsapplink" className="block font-semibold">WhatsApp Number</label>
                        <input
                            type="tel"
                            name="setting"
                            {...formik.getFieldProps('whatsapplink')}
                            className="h-12 border-2 rounded-md p-2 w-3/4 md:w-1/2"
                            placeholder="WhatsApp Number"
                            id="whatsapplink"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="otherlink" className="block font-semibold">Other Link</label>
                        <input
                            type="link"
                            {...formik.getFieldProps('otherlink')}
                            className="h-12 border-2 rounded-md p-2 w-3/4 md:w-1/2"
                            placeholder="Other Link"
                            id="otherlink"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-2 px-4 bg-blue-500 text-white rounded-md w-full hover:bg-blue-700"
                    >
                        Update
                    </button>
                </div>
            </form>
        </>
    )
}

export default StudentSocialMedia