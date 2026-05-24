import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/appContext";
import { addOwnerCar } from "../../api/ownerApi";
import { getErrorMessage } from "../../api/getErrorMessage";
import { queryKeys } from "../../queries/queryKeys";
import {
  buildCarFormData,
  initialCarForm,
  type CarFormValues,
} from "../../forms/carForm";
import CarForm from "../../components/owner/CarForm";

const AddCar = () => {
  const { currency, token, isInitialized } = useAppContext();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [image, setImage] = useState<File | null>(null);
  const [car, setCar] = useState<CarFormValues>(initialCarForm);

  const addCarMutation = useMutation({
    mutationFn: addOwnerCar,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Car added successfully");
        setImage(null);
        setCar(initialCarForm);
        queryClient.invalidateQueries({ queryKey: queryKeys.ownerCars });
        queryClient.invalidateQueries({ queryKey: queryKeys.ownerDashboard });
        queryClient.invalidateQueries({ queryKey: queryKeys.cars });
      } else {
        toast.error(data.message || "Unable to add car");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onSubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!token || !isInitialized) {
      toast.error(t("addCar.loginRequired"));
      return;
    }

    addCarMutation.mutate(buildCarFormData({ car, image }));
  };

  return (
    <div className="min-h-screen px-4 py-10 md:px-10 flex-1">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl md:text-6xl font-semibold text-slate-300 mb-2">
            {t("addCar.pageTitle")}
          </h2>
          <p className="text-slate-200">{t("addCar.pageSubtitle")}</p>
        </div>

        <CarForm
          car={car}
          setCar={setCar}
          image={image}
          setImage={setImage}
          currency={currency}
          mode="add"
          onSubmit={onSubmitHandler}
          isSubmitting={addCarMutation.isPending}
          submitLabel={t("addCar.submit.button")}
          submittingLabel={t("addCar.submit.loading")}
        />
      </div>
    </div>
  );
};

export default AddCar;
