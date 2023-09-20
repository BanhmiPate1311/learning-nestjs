import * as React from 'react';
import useSWR from 'swr';

export interface StudentDetailProps {
  studentId: any;
}

const MILLISECOND_PER_HOUR = 60 * 60 * 1000;

export function StudentDetail({ studentId }: StudentDetailProps) {
  const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`, {
    revalidateOnFocus: false, // tự động gọi lại api khi click tab khác và quay trở lại
    revalidateOnMount: true, // tự động gọi api khi component được mount, default: true
    // dedupingInterval: MILLISECOND_PER_HOUR, // tự động gọi lại api để cập nhật giá trị sau khoảng time cài đặt
    dedupingInterval: 2000,
  });
  const handleMutateClick = () => {
    mutate({ name: 'easy front end' }, true); // tham số thứ 2 là shouldRevalidate: tự động gọi api cập nhật lại giá trị
  };
  return (
    <div>
      Name: {data?.name || '--'} <button onClick={handleMutateClick}>mutate</button>
    </div>
  );
}
