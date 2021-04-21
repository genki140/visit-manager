import React, { useRef, useState } from 'react';
import { Button, Drawer, Fab, makeStyles, Slide } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Map, { MapPosition } from '@/components/map';
import ErrorPage from 'next/error';
import AddIcon from '@material-ui/icons/Add';
import { Marker, Polygon } from '@react-google-maps/api';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import { gql } from '@apollo/client';
import {
  useGetUserAreaQuery,
  useCreateResidenceMutation,
  GetUserAreaDocument,
  useUpdateResidenceMutation,
} from '@/types/graphql';
import { actions, useAppDispatch } from '@/ducks/store';

// 地図ページ。設定画面と兼用

const useStyle = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

// 会衆＆区域でユーザーの区域情報を取得する

// クエリ定義
export const getUserAreaGql = gql`
  query getUserArea($organizationId: ID!, $areaId: ID!) {
    userAreas(organizationId: $organizationId, ids: [$areaId]) {
      area {
        id
        name
        description
        residences {
          id
          name
          latitude
          longitude
          residents {
            id
            room
            floor
          }
        }
        polygons {
          id
          points {
            id
            latitude
            longitude
          }
        }
      }
    }
  }
`;

export const createResidenceGql = gql`
  mutation createResidence($areaId: ID!, $latitude: Float!, $longitude: Float!) {
    createResidence(residence: { areaId: $areaId, name: "", latitude: $latitude, longitude: $longitude }) {
      id
      latitude
      longitude
      name
      residents {
        id
        room
        floor
      }
    }
  }
`;

export const updateResidenceGql = gql`
  mutation updateResidence($id: ID!, $latitude: Float!, $longitude: Float!) {
    updateResidence(residence: { id: $id, name: "", latitude: $latitude, longitude: $longitude }) {
      id
      latitude
      longitude
      name
      residents {
        id
        room
        floor
      }
    }
  }
`;

// パスはここから取得
// https://fonts.google.com/icons?selected=Material+Icons&icon.query=house
const HousePath = 'M19,9.3V4h-3v2.6L12,3L2,12h3v8h5v-6h4v6h5v-8h3L19,9.3z M10,10c0-1.1,0.9-2,2-2s2,0.9,2,2H10z';
const ApartmentPath =
  'M17,11V3H7v4H3v14h8v-4h2v4h8V11H17z M7,19H5v-2h2V19z M7,15H5v-2h2V15z M7,11H5V9h2V11z M11,15H9v-2h2V15z M11,11H9V9h2 V11z M11,7H9V5h2V7z M15,15h-2v-2h2V15z M15,11h-2V9h2V11z M15,7h-2V5h2V7z M19,19h-2v-2h2V19z M19,15h-2v-2h2V15z';

const AreaPage = () => {
  const dispatch = useAppDispatch();
  const [roomEditTargetRoomId, setRoomEditTargetRoomId] = useState<number | undefined>();
  const [roomSelectTargetPlaceId, setRoomSelectTargetPlaceId] = useState<string | undefined>();

  // const [mapZoom, setMapZoom] = useState<number>();
  // const [mapCenter, setMapCenter] = useState<MapPosition>({ latitude: 0, longitude: 0 });

  const classes = useStyle();
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  // const organizationPath = '/' + organizationName;
  const areaName = (router.query.areaName ?? '').toString();
  // const areaPath = (organizationName === '' ? '' : '/' + organizationName) + (areaName === '' ? '' : '/' + areaName);

  // 現状、毎回オンラインから取得するため低速。追加後なのでキャッシュからで十分なんだが。
  const [createResidence, createResidenceResult] = useCreateResidenceMutation({
    // update: (cache, result) => {
    //   const comments = cache.readQuery({
    //     query: getUserAreaGql,
    //     variables: { organizationId: organizationName, areaId: areaName },
    //   });
    //   const newData = Object.assign(comments, result.data);
    //   cache.writeQuery({
    //   });
    // },
  });

  const [updateResidence, updateResidenceResult] = useUpdateResidenceMutation();

  // const [createResidence, createResidenceResult] = useCreateResidenceMutation({ refetchQueries: ['getUserArea'] });
  const getUserAreaResult = useGetUserAreaQuery({
    // fetchPolicy: 'cache-and-network',
    // nextFetchPolicy: 'cache-only',

    variables: { organizationId: organizationName, areaId: areaName },
  });
  const userArea = getUserAreaResult.data?.userAreas?.[0];

  // // ユーザーがこの組織に所属していなければ404
  // if (error != null) {
  //   const errorCode = error.graphQLErrors?.[0]?.extensions?.['code'];
  //   if (errorCode === 'NOT_FOUND') {
  //     return <Custom404 />;
  //   }
  // }

  // この区域がユーザーに配られていなければ404を表示する
  if (router.query.id == null) {
    // 通常モード
  } else if (router.query.ids?.[0] === 'settings') {
    // 設定モード
    // 設定モードでは、保存とキャンセルの操作を下に表示？
  } else {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout title={areaName + (createResidenceResult.loading ? '読み込み中' : '')} fillContent={true}>
      {userArea != null && (
        <>
          <Map>
            {(mapRef) => (
              <>
                {userArea.area.residences.map((residence) => {
                  return (
                    <Marker
                      key={'residence:' + residence.id}
                      position={{
                        lat: residence.latitude,
                        lng: residence.longitude,
                      }}
                      icon={{
                        fillColor: '#8888FF', //塗り潰し色
                        strokeColor: '#6666AA', //枠の色
                        fillOpacity: 1.0,
                        strokeOpacity: 1.0,
                        strokeWeight: 1.0, //枠の透過率
                        anchor: new window.google.maps.Point(12, 12),
                        path: HousePath,
                        scale: 1.5,
                      }}
                      draggable={true}
                      onClick={() => {
                        updateResidence({
                          variables: {
                            id: residence.id,
                            latitude: residence.latitude + 0.001,
                            longitude: residence.longitude,
                          },
                        });
                        setRoomSelectTargetPlaceId(residence.id);
                      }}
                    />
                  );
                })}

                <Polygon
                  editable={true} // ポイント移動を許可
                  draggable={true} // エッジ追加を許可
                  options={{
                    fillOpacity: 0, // 塗りつぶし無し
                    geodesic: false,
                    clickable: false, // 全体のクリック禁止
                    strokeColor: 'blue',
                  }}
                  onClick={(e) => {
                    console.log(e);
                  }}
                  path={[
                    {
                      lat: 35.69575,
                      lng: 139.77521,
                    },
                    {
                      lat: 36.69575,
                      lng: 138.77521,
                    },
                    {
                      lat: 36.69575,
                      lng: 139.77521,
                    },
                  ]}
                ></Polygon>

                <Slide direction="up" in={router.query.ids?.[0] === 'settings'} mountOnEnter unmountOnExit>
                  <div className={classes.button}>
                    <Fab
                      color="secondary"
                      onClick={async () => {
                        const pos = mapRef.getCenter().toJSON();

                        // dispatch(actions)
                        const result = await createResidence({
                          variables: {
                            areaId: userArea.area.id,
                            latitude: pos.lat,
                            longitude: pos.lng,
                          },
                          update: (cache, { data }) => {
                            // こんな感じで書きたい
                            // RefreshCache(getUserAreaResult,(cache)=>cache.userAreas[0].area.residences.push(data?.createResidence));

                            // キャッシュデータ取得
                            const readedQuery = cache.readQuery({
                              query: getUserAreaGql,
                              variables: { organizationId: organizationName, areaId: areaName },
                            }) as any;

                            // クエリに対するキャッシュデータ書き換え
                            const copiedData = JSON.parse(JSON.stringify(readedQuery));
                            copiedData.userAreas[0].area.residences.push(data?.createResidence);
                            console.log(copiedData);

                            // キャッシュデータ更新
                            cache.writeQuery({
                              query: getUserAreaGql,
                              variables: { organizationId: organizationName, areaId: areaName },
                              data: copiedData,
                            });
                          },
                        });
                      }}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                </Slide>
              </>
            )}
          </Map>

          {/* 部屋選択 */}
          <Drawer
            anchor="bottom"
            open={roomSelectTargetPlaceId != null && roomEditTargetRoomId == null}
            onClose={() => setRoomSelectTargetPlaceId(undefined)}
          >
            <div>部屋選択</div>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(3,50)',
                gridTemplateColumns: 'repeat(15,1fr)',
                gap: 5,
                margin: 5,
              }}
            >
              <Button
                variant="contained"
                style={{
                  gridColumn: 1,
                  gridRow: 3,
                  minWidth: 0,
                }}
              >
                101
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 2,
                  gridRow: 3,
                  minWidth: 0,
                }}
              >
                101
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 2,
                  gridRow: 2,
                  minWidth: 0,
                }}
              >
                202
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 3,
                  gridRow: 2,
                  minWidth: 0,
                }}
              >
                203
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 4,
                  gridRow: 2,
                  minWidth: 0,
                }}
              >
                204
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 15,
                  gridRow: 1,
                  minWidth: 0,
                }}
                onClick={() => {
                  setRoomEditTargetRoomId(1);
                }}
              >
                3015
              </Button>
            </div>
          </Drawer>

          <Drawer
            anchor="bottom"
            open={roomEditTargetRoomId != null}
            onClose={() => {
              setRoomSelectTargetPlaceId(undefined);
              setRoomEditTargetRoomId(undefined);
            }}
          >
            <div>操作</div>

            <Button variant="contained" startIcon={<DoneRoundedIcon />}>
              完了
            </Button>
            <Button variant="contained" startIcon={<BlockRoundedIcon />}>
              拒否
            </Button>
            <Button variant="contained">不在</Button>

            <Button
              variant="contained"
              startIcon={<KeyboardBackspaceRoundedIcon />}
              onClick={() => {
                setRoomEditTargetRoomId(undefined);
              }}
            >
              部屋一覧
            </Button>
          </Drawer>
        </>
      )}
    </Layout>
  );
};
export default AreaPage;
