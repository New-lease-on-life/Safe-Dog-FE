"use client";
import { CommonLayout } from "@/widgets/CommonLayout";
import { FormProvider } from "react-hook-form";
import { usePetRegistrationForm } from "../model/usePetReistrationFrom";
import { Progress } from "@/shared/ui/progress";
export const RegisterPage = () => {
  const { form, currentStep, totalSteps, goNext, goPrev, onSubmit } =
    usePetRegistrationForm();

  return (
    <CommonLayout>
      <FormProvider {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-6 p-4">
          <Progress value={(currentStep / totalSteps) * 100} />

          {currentStep === 1 && <div>1</div>}
          {currentStep === 2 && <div>2</div>}
          {currentStep === 3 && <div>3</div>}

          <div className="flex gap-2">
            {currentStep > 1 && (
              <button type="button" onClick={goPrev}>
                이전
              </button>
            )}
            {currentStep < totalSteps ? (
              <button type="button" onClick={goNext}>
                다음
              </button>
            ) : (
              <button type="submit">등록</button>
            )}
          </div>
        </form>
      </FormProvider>
    </CommonLayout>
  );
};
