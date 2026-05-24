import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { getOwnerCar, updateOwnerCar } from "../../api/ownerApi";
import { getErrorMessage } from "../../api/getErrorMessage";
import { queryKeys } from "../../queries/queryKeys";
import {
  buildCarFormData,
  initialCarForm,
  toCarForm,
  type CarFormValues,
} from "../../forms/carForm";
import CarForm from "../../components/owner/CarForm";

const EditCar = () => {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate();
  const { currency, token, isInitialized } = useAppContext();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [car, setCar] = useState<CarFormValues>(initialCarForm);

  const ownerCarQuery = useQuery({
    queryKey: queryKeys.ownerCar(carId),
    queryFn: () => getOwnerCar(carId),
    enabled: isInitialized && Boolean(token) && Boolean(carId),
  });

  const updateCarMutation = useMutation({
    mutationFn: updateOwnerCar,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Car updated successfully");
        queryClient.invalidateQueries({ queryKey: queryKeys.ownerCars });
        queryClient.invalidateQueries({ queryKey: queryKeys.ownerCar(carId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.ownerDashboard });
        queryClient.invalidateQueries({ queryKey: queryKeys.cars });
        navigate("/owner/manage-cars");
      } else {
        toast.error(data.message || "Unable to update car");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  useEffect(() => {
    if (!ownerCarQuery.data) return;

    if (ownerCarQuery.data.success) {
      const carData = ownerCarQuery.data.car;
      setCar(toCarForm(carData));
      setExistingImageUrl(carData.image);
      return;
    }

    toast.error(ownerCarQuery.data.message || "Unable to load car");
    navigate("/owner/manage-cars");
  }, [navigate, ownerCarQuery.data]);

  useEffect(() => {
    if (ownerCarQuery.error) {
      toast.error(getErrorMessage(ownerCarQuery.error));
      navigate("/owner/manage-cars");
    }
  }, [navigate, ownerCarQuery.error]);

  const onSubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!token || !isInitialized) {
      toast.error(t("addCar.loginRequired"));
      return;
    }

    updateCarMutation.mutate(buildCarFormData({ car, image, carId }));
  };

  if (ownerCarQuery.isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-10 md:px-10">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900 mb-4"></div>
          <p className="text-slate-300">{t("manageCars.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 md:px-10 flex-1">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>
              {t("editCar.backToManageCars") || "Back to Manage Cars"}
            </span>
          </button>

          <h1 className="text-4xl md:text-6xl font-semibold text-slate-300 mb-2">
            {t("addCar.pageTitle") || "Edit Car"}
          </h1>
          <p className="text-slate-200">
            {t("editCar.pageSubtitle") || "Update your vehicle information"}
          </p>
        </div>

        <CarForm
          car={car}
          setCar={setCar}
          image={image}
          setImage={setImage}
          existingImageUrl={existingImageUrl}
          currency={currency}
          mode="edit"
          onSubmit={onSubmitHandler}
          onCancel={() => navigate("/owner/manage-cars")}
          isSubmitting={updateCarMutation.isPending}
          submitLabel={t("editCar.button") || "Update Car"}
          submittingLabel={t("editCar.loading") || "Updating..."}
        />
      </div>
    </div>
  );
};

export default EditCar;
