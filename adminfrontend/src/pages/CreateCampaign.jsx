import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
// import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components/FundingComp';
import { checkIfImage } from '../utils';
import Sidebar from '../components/Sidebar';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true)
        // await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
        await createCampaign({name:form.name , title:form.title, description:form.description, target:form.target, deadline:form.deadline, image:form.image})
        console.log(form);
        setIsLoading(false);
        // navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }
  return (
    <div className="flex">
      <div className="left w-[25%]">
        <Sidebar />
      </div>

      <div className="right w-[60%] p-4">


        <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-2xl sm:p-10 p-4 '>
          {isLoading && <Loader />}
          <div className='flex justify-denter items-center p-[16px] sm:main-w-[380px] bg-[#3a3a43] rounded-[10px]'>
            <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a Campaign</h1>
          </div>

          <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Your Name *"
                placeholder="John Doe"
                inputType="text"
                value={form.name}
                handleChange={(e) => handleFormFieldChange('name', e)}
              />
              <FormField
                labelName="Campaign Title *"
                placeholder="Write a title"
                inputType="text"
                value={form.title}
                handleChange={(e) => handleFormFieldChange('title', e)}
              />
            </div>
            <FormField
              labelName="Story *"
              placeholder="Write your story"
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange('description', e)}
            />


            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Goal *"
                placeholder="ETH 0.50"
                inputType="text"
                value={form.target}
                handleChange={(e) => handleFormFieldChange('target', e)}
              />
              <FormField
                labelName="End Date *"
                placeholder="End Date"
                inputType="date"
                value={form.deadline}
                handleChange={(e) => handleFormFieldChange('deadline', e)}
              />
            </div>
            <FormField
              labelName="Campaign image *"
              placeholder="Place image URL of your campaign"
              inputType="url"
              value={form.image}
              handleChange={(e) => handleFormFieldChange('image', e)}
            />
            <div className="flex justify-center items-center mt-[40px]">
              <CustomButton
                btnType="submit"
                title="Submit new campaign"
                styles="bg-[#1dc071]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCampaign