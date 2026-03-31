import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services/userService";
import type { UserProfile } from "@/types/user";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      navigate("/customer/home");
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await userService.getProfile(user.id);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [user, navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Profile not found
      </div>
    );

  return (
    <div className="bg-[#f5f7fa] min-h-screen py-10">
      <div className="max-w-[700px] mx-auto px-4">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-500 hover:text-green-600"
        >
          <ArrowLeft size={18} />
          Quay lại
        </button>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-6">

          {/* HEADER */}
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-600">
              {profile.fullName?.charAt(0)}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {profile.fullName}
              </h2>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-5">

            <InfoItem icon={<User />} label="Họ tên" value={profile.fullName} />
            <InfoItem icon={<Mail />} label="Email" value={profile.email} />
            <InfoItem icon={<Phone />} label="Số điện thoại" value={profile.phone} />

            <InfoItem
              icon={<Calendar />}
              label="Ngày sinh"
              value={
                profile.birthDate
                  ? new Date(profile.birthDate).toLocaleDateString()
                  : null
              }
            />

            <InfoItem icon={"👤"} label="Giới tính" value={profile.gender} />
            <InfoItem icon={<MapPin />} label="Địa chỉ" value={profile.address} />

          </div>

          {/* EDIT BUTTON */}
          <button className="mt-8 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 flex items-center justify-center gap-2">
            <Edit size={18} />
            Chỉnh sửa thông tin
          </button>

        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-gray-400 w-5 h-5 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">
          {value || "Chưa cập nhật"}
        </p>
      </div>
    </div>
  );
}